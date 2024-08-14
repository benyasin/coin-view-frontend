"use client";
/* eslint-disable @next/next/no-img-element */
import { useIntl } from "react-intl";
import {
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  User,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { UserInfo, Video } from "@/types";
import { useRouter } from "next/navigation";
import { fetchYoutubers } from "@/actions/api";

type CustomizeProps = {
  user: UserInfo; // Ensure that user is of type UserInfo
};

export const Customize: React.FC<CustomizeProps> = ({ user }) => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [newYoutuber, setNewYoutuber] = useState({
    channel_title: "",
    subscribers: "",
    avatar: "",
  });
  const intl = useIntl();
  const [youtubers, setYoutubers] = useState([
    {
      channel_title: "Youtuber 1",
      subscribers: "Content Creator",
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026701d",
    },
    {
      channel_title: "Youtuber 2",
      subscribers: "Tech Reviewer",
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    },
  ]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const userId = user.id; // Replace this with actual user ID
    fetchYoutubers(userId)
      .then((data) => {
        setYoutubers(data.data); // Assuming the API returns data in a "data" field
      })
      .catch((err) => {
        console.error("Error fetching youtubers:", err);
      });
  }, []);

  const addYoutuber = () => {
    setVisible(false);
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
      <section className="p-6 rounded-lg shadow-lg bg-gray-900">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">
            {intl.formatMessage({ id: "youtubers" })}
          </h2>
          <Button
            variant="light"
            color="primary"
            size="md"
            onClick={() => setVisible(true)}
          >
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
                description={formatNumber(Number(yt.subscribers))}
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

      <Modal isOpen={visible} onClose={() => setVisible(false)}>
        <ModalHeader>
          <h3>Add New Youtuber</h3>
        </ModalHeader>
        <ModalBody>
          <Input
            fullWidth
            color="primary"
            size="lg"
            placeholder="Name"
            value={newYoutuber.channel_title}
            onChange={(e) =>
              setNewYoutuber({ ...newYoutuber, channel_title: e.target.value })
            }
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setVisible(false)}>Cancel</Button>
          <Button onClick={addYoutuber}>Add</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
