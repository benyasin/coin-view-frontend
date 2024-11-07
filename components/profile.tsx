"use client";
/* eslint-disable @next/next/no-img-element */
import { useIntl } from "react-intl";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  Link,
} from "@nextui-org/react";
import React from "react";
import { UserInfo } from "@/types";
import { deleteAuthCookie, findMyOrders } from "@/actions/api";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { ChevronDownIcon, ChevronRightIcon } from "@/components/icons";
import dayjs from "dayjs";
import { getLocalizedUrl } from "@/helpers/getLocalizedUrl";

type ProfileProps = {
  user: UserInfo; // Ensure that user is of type UserInfo
  onBackdropChange: (newTopValue: string) => void; // 回调函数
};

export const Profile: React.FC<ProfileProps> = ({ user, onBackdropChange }) => {
  const intl = useIntl();

  const [page, setPage] = React.useState(1);
  const [showTable, setShowTable] = React.useState(false);
  const [items, setItems] = React.useState(0);
  const [pages, setPages] = React.useState(0);

  const handleLogout = async () => {
    console.log("User logged out");
    await deleteAuthCookie();
    location.href = "/";
  };

  const findOrderByUser = async (userId: string, page: number) => {
    const { data } = await findMyOrders(userId, page);
    setPages(data.total_pages);
    setItems(data.orders);
  };

  // 处理防抖的useEffect
  React.useEffect(() => {
    const handler = setTimeout(() => {
      findOrderByUser(user.id, page); // 你的请求函数
    }, 300);

    // 清除上一次的定时器
    return () => {
      clearTimeout(handler);
    };
  }, [user.id, page, intl]); // 依赖项为这些值

  const handleUpgrade = async () => {
    location.href = getLocalizedUrl("/#premium", intl.locale);
  };

  const itemClasses = {
    base: "py-0 w-full",
    title: "font-normal text-medium text-default-500",
    trigger: "px-0 py-0 flex justify-start",
    indicator: "text-medium hidden",
    content: "text-small px-0",
  };

  // 当展开订单时，调用回调函数
  const handleAccordionOpen = (keys: any) => {
    if (keys.size) {
      onBackdropChange("53%"); // 修改backdrop的top值
      setShowTable(true);
    } else {
      onBackdropChange("43%"); // 修改backdrop的top值
      setShowTable(false);
    }
  };

  return (
    <Card className="mb-8 p-8 bg-gradient-to-r from-gray-100 to-green-300 dark:from-gray-900 dark:to-green-950 shadow-lg rounded-lg">
      <CardBody>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div>
              <div className="text-3xl text-gray-400 font-bold mb-2">
                {user?.username}
              </div>
              <div className="text-md text-gray-600">{user?.email}</div>
              <div className="text-md text-gray-600 mt-1">
                {intl.formatMessage({ id: "currently_you" })}
                <span className="font-bold text-yellow-800">
                  {user?.is_member
                    ? intl.formatMessage({
                        id: user?.membership_level.replace(" ", "_"),
                      })
                    : intl.formatMessage({ id: "free_plan" })}
                </span>
              </div>
              {user?.is_member && (
                <div className="text-md text-gray-600 mt-1">
                  {intl.formatMessage(
                    { id: "expire_in" },
                    { dueDay: user?.membership_expiry }
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-between items-center">
            <Button
              size="lg"
              onClick={handleLogout}
              color="primary"
              className="mb-8"
              variant="light"
            >
              {intl.formatMessage({ id: "logout" })}
            </Button>

            <Button
              size="sm"
              onClick={handleUpgrade}
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            >
              {intl.formatMessage({ id: "upgrade_to_premium" })}
            </Button>
          </div>
        </div>

        <Accordion
          className="px-0 mt-2 flex flex-row justify-start"
          itemClasses={itemClasses}
          onSelectionChange={handleAccordionOpen} // 当展开时触发修改backdrop
        >
          <AccordionItem
            key="1"
            aria-label="Order"
            startContent={
              showTable ? <ChevronDownIcon /> : <ChevronRightIcon />
            }
            title={intl.formatMessage({ id: "order_list" })}
          >
            <Table
              aria-label="Example table with client side pagination"
              bottomContent={
                <div className="flex w-full justify-center">
                  <Pagination
                    isCompact
                    showControls
                    variant="light"
                    showShadow
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                  />
                </div>
              }
              classNames={{
                wrapper: "min-h-[160px] mt-6 bg-transparent",
              }}
            >
              <TableHeader>
                <TableColumn key="name" className="bg-transparent">
                  {intl.formatMessage({ id: "order_no" })}
                </TableColumn>
                <TableColumn key="member_plan" className="bg-transparent">
                  {intl.formatMessage({ id: "member_plan" })}
                </TableColumn>
                <TableColumn key="pay_way" className="bg-transparent">
                  {intl.formatMessage({ id: "pay_way" })}
                </TableColumn>
                <TableColumn key="amount" className="bg-transparent">
                  {intl.formatMessage({ id: "amount" })}
                </TableColumn>
                <TableColumn key="created_at" className="bg-transparent">
                  {intl.formatMessage({ id: "created_at" })}
                </TableColumn>
                <TableColumn key="expiration_time" className="bg-transparent">
                  {intl.formatMessage({ id: "expiration_time" })}
                </TableColumn>
                <TableColumn key="checkout_url" className="bg-transparent">
                  {intl.formatMessage({ id: "checkout_url" })}
                </TableColumn>
                <TableColumn key="status" className="bg-transparent">
                  {intl.formatMessage({ id: "status" })}
                </TableColumn>
              </TableHeader>
              <TableBody items={Array.isArray(items) ? items : []}>
                {(item) => (
                  <TableRow key={item._id} className="text-default-500">
                    <TableCell>{item._id}</TableCell>
                    <TableCell>
                      {intl.formatMessage({ id: item.member_plan })}
                    </TableCell>
                    <TableCell>
                      {intl.formatMessage({ id: item.pay_way })}
                    </TableCell>
                    <TableCell>${item.amount}</TableCell>
                    <TableCell>
                      {dayjs(item.created_at).format("YYYY-MM-DD HH:mm:ss")}
                    </TableCell>
                    <TableCell>
                      {dayjs(item.expiration_time).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={item.checkout_url}
                        target="_blank"
                        className="text-sm"
                      >
                        {intl.formatMessage({ id: "continue_payment" })}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {intl.formatMessage({ id: "status" + item.status })}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </AccordionItem>
        </Accordion>
      </CardBody>
    </Card>
  );
};
