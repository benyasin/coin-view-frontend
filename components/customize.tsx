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
  Card,
  CardBody,
  Tooltip,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { UserInfo, Youtuber } from "@/types";
import {
  fetchYoutubers,
  fetchRecommendedYoutubers,
  addYoutuberToDB,
  searchYoutuber,
  deleteYoutuberFromDB,
} from "@/actions/api";
import toast, { Toaster } from "react-hot-toast";
import { getChannelLimit } from "@/config/enums";

type CustomizeProps = {
  user: UserInfo;
};

export const Customize: React.FC<CustomizeProps> = ({ user }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [channelId, setChannelId] = useState("");
  const [searchResult, setSearchResult] = useState<Youtuber | null>(null);
  const [searchError, setSearchError] = useState("");
  const [selectedYoutuber, setSelectedYoutuber] = useState<Youtuber | null>(
    null
  );
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange,
  } = useDisclosure();
  const intl = useIntl();
  const [youtubers, setYoutubers] = useState<Youtuber[]>([]);
  const [recommendedYoutubers, setRecommendedYoutubers] = useState<Youtuber[]>(
    []
  );

  const notify = () =>
    toast.success(intl.formatMessage({ id: "add_youtuber_successfully" }));
  const deleteNotify = () =>
    toast.success(intl.formatMessage({ id: "delete_youtuber_successfully" }));

  useEffect(() => {
    const userId = user.id;
    if (user.is_admin) {
      fetchYoutubers()
        .then((data) => {
          setYoutubers(data.data); // Assuming the API returns data in a "data" field
        })
        .catch((err) => {
          console.error("Error fetching youtubers:", err);
        });
    } else {
      if (user.is_member) {
        fetchYoutubers(userId)
          .then((data) => {
            setYoutubers(data.data); // Assuming the API returns data in a "data" field
          })
          .catch((err) => {
            console.error("Error fetching youtubers:", err);
          });

        fetchRecommendedYoutubers()
          .then((data: { data: React.SetStateAction<Youtuber[]> }) => {
            data.data && setRecommendedYoutubers(data.data);
          })
          .catch((err) => {
            console.error("Error fetching recommend youtubers:", err);
          });
      }
    }
  }, [user.is_member, user.is_admin]);

  const changeAnotherBatch = async () => {
    fetchRecommendedYoutubers()
      .then((data: { data: React.SetStateAction<Youtuber[]> }) => {
        data.data && setRecommendedYoutubers(data.data);
      })
      .catch((err) => {
        console.error("Error fetching recommend youtubers:", err);
      });
  };

  const findYoutuber = async () => {
    setSearchError("");
    if (channelId) {
      try {
        const { data } = await searchYoutuber(channelId);
        if (data) {
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
            fetchYoutubers(user.id)
              .then((data) => {
                setYoutubers(data.data); // Assuming the API returns data in a "data" field
              })
              .catch((err) => {
                console.error("Error fetching youtubers:", err);
              });
          }
        } catch (e) {
          console.error(e);
        }
      }
    } catch (err) {
      console.error("Error adding Youtuber:", err);
    }
  };

  const confirmDeleteYoutuber = async () => {
    if (selectedYoutuber) {
      try {
        const result = await deleteYoutuberFromDB(
          selectedYoutuber.channel_id,
          user.id
        );
        if (result.status_code === 200) {
          deleteNotify();
          // @ts-ignore
          onDeleteOpenChange(false); // 关闭删除确认 Modal
          fetchYoutubers(user.id)
            .then((data) => {
              setYoutubers(data.data); // Assuming the API returns data in a "data" field
            })
            .catch((err) => {
              console.error("Error fetching youtubers:", err);
            });
        } else {
          console.error("delete user_youtuber error");
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleSubscribe = async (youtuber: Youtuber) => {
    try {
      const result = await addYoutuberToDB(youtuber, user.id);
      if (result.status_code === 200) {
        notify();
        fetchYoutubers(user.id)
          .then((data) => {
            setYoutubers(data.data); // Assuming the API returns data in a "data" field
          })
          .catch((err) => {
            console.error("Error fetching youtubers:", err);
          });
      }
    } catch (error) {
      console.error("订阅频道时出错：", error);
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

      <Modal
        size="md"
        backdrop="blur"
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
      >
        <ModalContent>
          <ModalBody className="pt-10">
            <p>{intl.formatMessage({ id: "confirm_delete_message" })}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={confirmDeleteYoutuber}>
              {intl.formatMessage({ id: "confirm" })}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <section className="p-12 rounded-lg shadow-lg dark:bg-gray-900">
        <div className="flex justify-between items-center mb-4">
          <div className="inline-block">
            <h2 className="text-2xl text-gray-400 font-bold">
              {intl.formatMessage({ id: "youtubers" })}
            </h2>
            <h6 className="text-default-400">
              {intl.formatMessage(
                { id: "youtubers_added" },
                {
                  youtuberAdded: youtubers.length,
                }
              )}
            </h6>
            {!user.is_admin && (
              <h6 className="text-default-500">
                {intl.formatMessage(
                  { id: "youtubers_left" },
                  {
                    youtubers_left:
                      getChannelLimit(user.membership_level) - youtubers.length,
                  }
                )}
              </h6>
            )}
          </div>
          {!user.is_admin &&
            getChannelLimit(user.membership_level) - youtubers.length > 0 && (
              <Button
                variant="shadow"
                size="md"
                color="success"
                onClick={onOpen}
              >
                {intl.formatMessage({ id: "add_youtuber" })}
              </Button>
            )}
          {user.is_admin && (
            <Button variant="shadow" size="md" color="success" onClick={onOpen}>
              {intl.formatMessage({ id: "add_youtuber" })}
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {youtubers.map((yt, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg border-1 border-gray-200 dark:border-gray-800"
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
                onClick={() => {
                  setSelectedYoutuber(yt);
                  onDeleteOpen();
                }}
              >
                {intl.formatMessage({ id: "delete" })}
              </Button>
            </div>
          ))}
        </div>
      </section>
      {!user.is_admin && (
        <section className="mt-16">
          <div className="text-default-500 px-2">
            {intl.formatMessage({ id: "recommend_youtubers_desc" })}
          </div>
          <Card className="mt-4">
            <CardBody>
              <div className="text-right">
                <Button
                  variant="ghost"
                  color="secondary"
                  size={"md"}
                  className="my-4"
                  onClick={changeAnotherBatch}
                >
                  {intl.formatMessage({ id: "change_another_batch" })}
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {recommendedYoutubers.map((yt) => (
                  <div
                    key={yt.channel_id}
                    className="flex flex-col items-center p-4 rounded-lg border border-gray-200 dark:border-gray-800"
                  >
                    <Avatar src={yt.avatar} size="lg" />
                    <h4 className="mt-2 text-lg font-semibold">
                      {yt.channel_title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {yt.subscribers}{" "}
                      {intl.formatMessage({ id: "subscribers" })}
                    </p>
                    <Tooltip
                      content={intl.formatMessage({
                        id: "subscribe_the_channel",
                      })}
                    >
                      <Button
                        size="sm"
                        color="success"
                        onClick={() => handleSubscribe(yt)}
                        className="mt-2"
                      >
                        {intl.formatMessage({ id: "subscribe" })}
                      </Button>
                    </Tooltip>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </section>
      )}
      <Toaster />
    </>
  );
};
