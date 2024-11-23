import {
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Textarea,
  DatePicker,
  ModalFooter,
  useDisclosure,
  DateValue,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import toast, { Toaster } from "react-hot-toast";
import {
  fetchAnnouncements,
  addAnnouncement,
  deleteAnnouncement,
  toggleAnnouncementStatus,
} from "@/actions/api";
import { useIntl } from "react-intl"; // 需要确保 `deleteAnnouncement` 和 `toggleAnnouncementStatus` API 已实现

type Announcement = {
  _id: string; // 添加一个唯一标识符 id
  content: string;
  is_revoked: boolean;
  created_at: string;
  display_from: string;
  display_to: string;
};

export const Announcement: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const rowsPerPage = 5;
  const intl = useIntl();
  // Form state
  const [content, setContent] = useState("");
  const [displayFrom, setDisplayFrom] = useState<DateValue | null>(null);
  const [displayTo, setDisplayTo] = useState<DateValue | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const searchAnnouncements = async () => {
      try {
        const response = await fetchAnnouncements(page, rowsPerPage);
        setAnnouncements(response.data.announcements);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch announcements.");
      }
    };

    searchAnnouncements();
  }, [page]);

  const handleAddAnnouncement = async () => {
    if (!content || !displayFrom || !displayTo) {
      toast.error("Please fill in all fields before saving.");
      return;
    }

    try {
      const response = await addAnnouncement({
        content: content,
        display_from: displayFrom.toString(),
        display_to: displayTo.toString(),
      });

      if (response.status_code === 200) {
        toast.success("Announcement added successfully!");
        setContent("");
        setDisplayFrom(null);
        setDisplayTo(null);
        //@ts-ignore
        onOpenChange(false);

        const refreshedResponse = await fetchAnnouncements(page, rowsPerPage);
        setAnnouncements(refreshedResponse.data.announcements);
        setTotalPages(refreshedResponse.data.totalPages);
      } else {
        throw new Error("Failed to add announcement");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add announcement.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteAnnouncement(id);
      if (response.status_code === 200) {
        toast.success("Announcement deleted successfully!");
        const refreshedResponse = await fetchAnnouncements(page, rowsPerPage);
        setAnnouncements(refreshedResponse.data.announcements);
        setTotalPages(refreshedResponse.data.totalPages);
      } else {
        throw new Error("Failed to delete announcement");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete announcement.");
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      const response = await toggleAnnouncementStatus(id);
      if (response.status_code === 200) {
        toast.success("Announcement status updated successfully!");
        const refreshedResponse = await fetchAnnouncements(page, rowsPerPage);
        setAnnouncements(refreshedResponse.data.announcements);
        setTotalPages(refreshedResponse.data.totalPages);
      } else {
        throw new Error("Failed to update announcement status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update announcement status.");
    }
  };

  const renderCell = React.useCallback(
    (announcement: Announcement, columnKey: React.Key) => {
      switch (columnKey) {
        case "content":
          return <p className="text-small">{announcement.content}</p>;
        case "is_revoked":
          return (
            <Chip color={announcement.is_revoked ? "danger" : "success"}>
              {announcement.is_revoked
                ? intl.formatMessage({ id: "revoked" })
                : intl.formatMessage({ id: "is_active" })}
            </Chip>
          );
        case "created_at":
          return (
            <p className="text-small">
              {dayjs(announcement.created_at).format("YYYY-MM-DD HH:mm:ss")}
            </p>
          );
        case "display_from":
          return (
            <p className="text-small">
              {dayjs(announcement.display_from).format("YYYY-MM-DD HH:mm:ss")}
            </p>
          );
        case "display_to":
          return (
            <p className="text-small">
              {dayjs(announcement.display_to).format("YYYY-MM-DD HH:mm:ss")}
            </p>
          );
        case "actions":
          return (
            <div className="flex space-x-2">
              <Button
                size="sm"
                color="danger"
                onClick={() => handleDelete(announcement._id)}
              >
                {intl.formatMessage({ id: "delete" })}
              </Button>
              <Button
                size="sm"
                color="warning"
                onClick={() => handleToggleStatus(announcement._id)}
              >
                {announcement.is_revoked
                  ? intl.formatMessage({ id: "active" })
                  : intl.formatMessage({ id: "revoke" })}
              </Button>
            </div>
          );
        default:
          return null;
      }
    },
    [intl]
  );

  const columns = [
    {
      name: intl.formatMessage({ id: "announcement_content" }),
      uid: "content",
    },
    { name: intl.formatMessage({ id: "status" }), uid: "is_revoked" },
    { name: intl.formatMessage({ id: "created_at" }), uid: "created_at" },
    { name: intl.formatMessage({ id: "display_from" }), uid: "display_from" },
    { name: intl.formatMessage({ id: "display_to" }), uid: "display_to" },
    { name: intl.formatMessage({ id: "actions" }), uid: "actions" },
  ];

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
                <h3>{intl.formatMessage({ id: "add_announcement" })}</h3>
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col space-y-4">
                  <Textarea
                    placeholder={intl.formatMessage({
                      id: "announcement_content",
                    })}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={4}
                  />
                  <DatePicker
                    label={intl.formatMessage({ id: "display_from" })}
                    value={displayFrom}
                    onChange={setDisplayFrom}
                  />
                  <DatePicker
                    label={intl.formatMessage({ id: "display_to" })}
                    value={displayTo}
                    onChange={setDisplayTo}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="shadow"
                  color="primary"
                  onClick={handleAddAnnouncement}
                >
                  {intl.formatMessage({ id: "confirm_add" })}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="text-right mb-4">
        <Button color="primary" onClick={onOpen}>
          {intl.formatMessage({ id: "add_announcement" })}
        </Button>
      </div>
      <Table
        aria-label="Announcement Table"
        isHeaderSticky
        bottomContent={
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={totalPages}
            onChange={(newPage) => setPage(newPage)}
          />
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={announcements}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Toaster />
    </>
  );
};
