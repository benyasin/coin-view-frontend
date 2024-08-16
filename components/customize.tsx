"use client";
/* eslint-disable @next/next/no-img-element */
import { useIntl } from "react-intl";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  User,
  Avatar,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { UserInfo, Youtuber } from "@/types";
import { fetchYoutubers, addYoutuberToDB, searchYoutuber } from "@/actions/api";
import toast, { Toaster } from "react-hot-toast";

type CustomizeProps = {
  user: UserInfo;
};

export const Customize: React.FC<CustomizeProps> = ({ user }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [channelId, setChannelId] = useState("");
  const [searchResult, setSearchResult] = useState<Youtuber | null>(null);
  const [searchError, setSearchError] = useState("");
  const intl = useIntl();
  const [youtubers, setYoutubers] = useState<Youtuber[]>([]);
  const notify = () =>
    toast.success(intl.formatMessage({ id: "add_youtuber_successfully" }));

  useEffect(() => {
    const userId = user.id;
    fetchYoutubers(userId)
      .then((data) => {
        console.log(data);
        setYoutubers(data.data); // Assuming the API returns data in a "data" field
      })
      .catch((err) => {
        console.error("Error fetching youtubers:", err);
      });
  }, [user]);

  const findYoutuber = async () => {
    setSearchError("");
    if (channelId) {
      try {
        const { data } = await searchYoutuber(channelId);
        if (data) {
          console.log(data);
          const result = {
            channel_id: data.channel_id,
            avatar: data.channel_thumbnail,
            channel_title: data.channel_title,
            subscribers: data.subscriber_count,
          };
          setSearchResult(result);
        } else {
          setSearchResult(null);
          setSearchError(intl.formatMessage({ id: "youtuber_search_error" }));
        }
      } catch (err) {
        console.error("Error finding Youtuber:", err);
        setSearchError(intl.formatMessage({ id: "youtuber_search_error" }));
      }
    }
  };

  const confirmAddYoutuber = async () => {
    try {
      if (searchResult) {
        try {
          const result = await addYoutuberToDB(searchResult, user.id);
          if (result.status_code === 200) {
            notify();
            // @ts-ignore
            onOpenChange(false); // 关闭 Modal
            setTimeout(() => {
              location.reload();
            }, 1500);
          }
        } catch (e) {
          console.error(e);
        }
      }
    } catch (err) {
      console.error("Error adding Youtuber:", err);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    } else {
      return num.toString();
    }
  };

  const deleteYoutuber = (index: number) => {
    const updatedYoutubers = youtubers.filter((_, i) => i !== index);
    setYoutubers(updatedYoutubers);
  };

  return (
    <>
      <Modal
        size="5xl"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h3>{intl.formatMessage({ id: "search_youtuber" })}</h3>
              </ModalHeader>
              <ModalBody>
                <div className="flex items-start space-x-4">
                  <Input
                    isClearable
                    color="primary"
                    size="lg"
                    placeholder={intl.formatMessage({
                      id: "channel_id_placeholder",
                    })}
                    description={intl.formatMessage({
                      id: "channel_id_describe",
                    })}
                    onChange={(e) => {
                      setChannelId(e.target.value);
                      setSearchResult(null);
                      setSearchError("");
                    }}
                  />
                  <Button
                    variant="shadow"
                    color="primary"
                    onClick={findYoutuber}
                  >
                    {intl.formatMessage({ id: "search" })}
                  </Button>
                </div>
                {searchError && (
                  <p className="text-red-500 mt-2">{searchError}</p>
                )}
                {searchResult && (
                  <div className="mt-4 flex items-center space-x-4">
                    <Avatar src={searchResult.avatar} />
                    <div>
                      <p>{searchResult.channel_title}</p>
                      <p>
                        {formatNumber(Number(searchResult.subscribers))}{" "}
                        {intl.formatMessage({ id: "subscribers" })}
                      </p>
                    </div>
                  </div>
                )}
                <img
                  src="/channel-id.jpg"
                  alt="How to find Channel ID"
                  className="mt-4"
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  variant={!searchResult ? "light" : "shadow"}
                  color="primary"
                  onClick={confirmAddYoutuber}
                  disabled={!searchResult}
                >
                  {intl.formatMessage({ id: "confirm_add" })}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <section className="p-6 rounded-lg shadow-lg bg-gray-900">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">
            {intl.formatMessage({ id: "youtubers" })}
          </h2>
          <Button variant="light" color="primary" size="md" onClick={onOpen}>
            {intl.formatMessage({ id: "add_youtuber" })}
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {youtubers.map((yt, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <User
                name={yt.channel_title}
                description={
                  formatNumber(Number(yt.subscribers)) +
                  " " +
                  intl.formatMessage({ id: "subscribers" })
                }
                avatarProps={{ src: yt.avatar }}
              />
              <Button
                variant="light"
                color="danger"
                onClick={() => deleteYoutuber(index)}
              >
                {intl.formatMessage({ id: "delete" })}
              </Button>
            </div>
          ))}
        </div>
      </section>
      <Toaster />
    </>
  );
};
