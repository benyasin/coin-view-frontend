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
import { users } from "./data";
import { useIntl } from "react-intl";
import { getLocalTimeZone, today } from "@internationalized/date";

const opinionColorMap: Record<string, ChipProps["color"]> = {
  bullish: "success",
  bearish: "danger",
  neutral: "primary",
};

const INITIAL_VISIBLE_COLUMNS = ["youtuber", "title", "opinion", "date"];
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
type User = (typeof users)[0];

export const Statistics = () => {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [opinionFilter, setOpinionFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });
  const intl = useIntl();

  let defaultDate = today(getLocalTimeZone());
  const [dateValue, setDateValue] = React.useState<DateValue>(defaultDate);

  const [page, setPage] = React.useState(1);
  const columns = [
    { name: "ID", uid: "id", sortable: true },
    {
      name: intl.formatMessage({ id: "youtuber" }),
      uid: "youtuber",
      sortable: true,
    },
    {
      name: intl.formatMessage({ id: "video_title" }),
      uid: "title",
      sortable: true,
    },
    { name: intl.formatMessage({ id: "core_view" }), uid: "coreView" },
    { name: intl.formatMessage({ id: "publish_date" }), uid: "date" },
    {
      name: intl.formatMessage({ id: "opinion" }),
      uid: "opinion",
      sortable: true,
    },
  ];
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns, intl]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.youtuber.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (opinionFilter !== "all" && Array.from(opinionFilter).length !== 3) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(opinionFilter).includes(user.opinion)
      );
    }

    return filteredUsers;
  }, [users, intl, filterValue, opinionFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as number;
      const second = b[sortDescriptor.column as keyof User] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "youtuber":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.date}
            name={cellValue}
          >
            {user.date}
          </User>
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
      case "opinion":
        return (
          <Chip
            className="capitalize"
            color={opinionColorMap[user.opinion]}
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

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages, intl]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page, intl]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
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
            onClear={() => onClear()}
            onValueChange={onSearchChange}
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
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  {intl.formatMessage({ id: "columns" })}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
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
              { video_length: users.length }
            )}
          </span>
          <label className="flex items-center text-default-400 text-small">
            {intl.formatMessage({ id: "rows_per_page" })}
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    intl,
    dateValue,
    opinionFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    users.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            {intl.formatMessage({ id: "previous" })}
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            {intl.formatMessage({ id: "next" })}
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, intl, items.length, page, pages, hasSearchFilter]);

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
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
