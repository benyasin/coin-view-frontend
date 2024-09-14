"use client";
/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  DatePicker,
  Selection,
  ChipProps,
  SortDescriptor,
  DateValue,
} from "@nextui-org/react";
import { ChevronDownIcon, ExportIcon } from "@/components/icons";
import { SearchIcon } from "@/components/icons";
import { useIntl } from "react-intl";
import { getLocalTimeZone } from "@internationalized/date";
import axios from "axios"; // Make sure axios is imported
import { searchVideo } from "@/actions/api";
import { Video } from "@/types";
import dayjs from "dayjs"; // Import the API function from the correct path
import { useDebounce } from "@/helpers/utils";

const opinionColorMap: Record<string, ChipProps["color"]> = {
  bullish: "success",
  bearish: "danger",
  neutral: "primary",
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

const INITIAL_VISIBLE_COLUMNS = [
  "channel_title",
  "title",
  "sentiment",
  "created_at",
];
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const Statistics = () => {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [opinionFilter, setOpinionFilter] = React.useState<Selection>(
    new Set(["bullish", "bearish", "neutral"])
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [totalItems, setTotalItems] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });
  const [videos, setVideos] = React.useState([]);
  const intl = useIntl();

  const [dateValue, setDateValue] = React.useState<DateValue | null>(null); // DatePicker default to null
  const [page, setPage] = React.useState(1);

  const columns = [
    { name: "ID", uid: "id", sortable: true },
    {
      name: intl.formatMessage({ id: "youtuber" }),
      uid: "channel_title",
      sortable: true,
    },
    {
      name: intl.formatMessage({ id: "video_title" }),
      uid: "title",
      sortable: true,
    },
    { name: intl.formatMessage({ id: "core_view" }), uid: "coreView" },
    { name: intl.formatMessage({ id: "publish_date" }), uid: "created_at" },
    {
      name: intl.formatMessage({ id: "opinion" }),
      uid: "sentiment",
      sortable: true,
    },
  ];

  const fetchVideos = async () => {
    const opinionString = Array.from(opinionFilter).join(",");
    const dateStr = dateValue ? dateValue.toString() : "";
    const { data } = await searchVideo(
      dateStr,
      opinionString,
      filterValue,
      page,
      rowsPerPage
    );
    setVideos(data?.videos || []);
    setPage(page);
    setRowsPerPage(rowsPerPage);
    setTotalItems(data.total_videos);
    setTotalPages(data.total_pages);
  };

  // 处理防抖的useEffect
  React.useEffect(() => {
    // 创建一个定时器，300毫秒后触发fetchVideos
    const handler = setTimeout(() => {
      fetchVideos(); // 你的请求函数
    }, 300);

    // 清除上一次的定时器
    return () => {
      clearTimeout(handler);
    };
  }, [filterValue, opinionFilter, dateValue, page, rowsPerPage]); // 依赖项为这些值

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns, intl]);

  const sortedItems = React.useMemo(() => {
    return [...videos].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof typeof a] as number;
      const second = b[sortDescriptor.column as keyof typeof b] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, videos]);

  const renderCell = React.useCallback((user: any, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof typeof user];

    switch (columnKey) {
      case "channel_title":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={
              formatNumber(Number.parseInt(user.subscribers)) +
              " " +
              intl.formatMessage({ id: "subscribers" })
            }
            name={cellValue}
          ></User>
        );
      case "title":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {user.coreView}
            </p>
          </div>
        );
      case "created_at":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {dayjs(cellValue).format("YYYY-MM-DD")}
            </p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {user.coreView}
            </p>
          </div>
        );
      case "sentiment":
        return (
          <Chip
            className="capitalize"
            color={opinionColorMap[user.sentiment]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      default:
        return cellValue;
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4 mt-16">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[34%]"
            placeholder={intl.formatMessage({ id: "search_youtuber" })}
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => setFilterValue("")}
            onValueChange={setFilterValue}
          />
          <div className="flex gap-3">
            <DatePicker
              label={intl.formatMessage({ id: "publish_date" })}
              labelPlacement="outside-left"
              className="max-w-[284px]"
              value={dateValue}
              onChange={setDateValue}
            />
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  {intl.formatMessage({ id: "opinion" })}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={opinionFilter}
                selectionMode="multiple"
                onSelectionChange={setOpinionFilter}
              >
                <DropdownItem key="bullish" className="capitalize">
                  {intl.formatMessage({ id: "bullish" })}
                </DropdownItem>
                <DropdownItem key="bearish" className="capitalize">
                  {intl.formatMessage({ id: "bearish" })}
                </DropdownItem>
                <DropdownItem key="neutral" className="capitalize">
                  {intl.formatMessage({ id: "neutral" })}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Button
              color="primary"
              size="sm"
              className="text-white shadow-lg w-[120px]"
              endContent={<ExportIcon />}
            >
              {intl.formatMessage({ id: "export" })}
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            {intl.formatMessage(
              { id: "total_videos" },
              { video_length: totalItems }
            )}
          </span>
          <label className="flex items-center text-default-400 text-small">
            {intl.formatMessage({ id: "rows_per_page" })}
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [filterValue, intl, dateValue, opinionFilter, totalItems]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={totalPages}
          onChange={setPage}
        />
      </div>
    );
  }, [page, totalPages, rowsPerPage]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectedKeys={selectedKeys}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={"start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={sortedItems}>
        {(item: Video) => (
          <TableRow key={item.video_id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
