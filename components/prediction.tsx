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
  Pagination,
  DatePicker,
  DateValue,
} from "@nextui-org/react";
import { ChevronDownIcon, ExportIcon } from "@/components/icons";
import { useIntl } from "react-intl";
import { searchSummary } from "@/actions/api"; // 使用您提供的 API 方法
import { UserInfo, Summary } from "@/types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh"; // 导入中文语言包
import "dayjs/locale/en"; // 导入英文语言包

// 启用插件
dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(timezone);
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

type StatisticsProps = {
  user: UserInfo;
};

export const Prediction: React.FC<StatisticsProps> = ({ user }) => {
  const [summaries, setSummaries] = React.useState<Summary[]>([]);
  const [totalItems, setTotalItems] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);
  const [dateValue, setDateValue] = React.useState<DateValue | null>(null); // 用于日期选择
  const intl = useIntl();

  const columns = [
    {
      name: intl.formatMessage({ id: "trend" }),
      uid: "trend",
    },
    {
      name: intl.formatMessage({ id: "viewpoint" }),
      uid: "viewpoint",
    },
    { name: intl.formatMessage({ id: "prediction" }), uid: "prediction" },
    { name: intl.formatMessage({ id: "created_at" }), uid: "created_at" },
  ];

  const fetchSummaries = async () => {
    const dateStr = dateValue ? dateValue.toString() : "";
    const { data } = await searchSummary(dateStr, page, rowsPerPage); // 使用searchSummary查询数据
    setSummaries(data?.summaries || []);
    setTotalItems(data.total_summaries);
    setTotalPages(data.total_pages);
  };

  React.useEffect(() => {
    user.is_member && fetchSummaries(); // 组件加载时触发查询
  }, [dateValue, page, rowsPerPage]); // 依赖项为日期、分页和每页条数

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <div className="flex gap-3 text-default-500">
            <DatePicker
              label={intl.formatMessage({ id: "created_at" })}
              labelPlacement="outside-left"
              className="max-w-[284px]"
              value={dateValue}
              onChange={setDateValue}
            />
            <Button
              color="primary"
              size="sm"
              disabled={!user.is_member}
              className="text-white shadow-lg w-[120px]"
              endContent={<ExportIcon />}
              onClick={fetchSummaries} // 查询按钮触发查询
            >
              {intl.formatMessage({ id: "search" })}
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            {intl.formatMessage(
              { id: "total_summaries" },
              { summary_length: totalItems }
            )}
          </span>
          <label className="flex items-center text-default-400 text-small">
            {intl.formatMessage({ id: "rows_per_page" })}
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
            >
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [dateValue, totalItems]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          color="primary"
          page={page}
          total={totalPages}
          onChange={setPage}
        />
      </div>
    );
  }, [page, totalPages]);

  const renderCell = React.useCallback(
    (summary: Summary, columnKey: React.Key) => {
      const cellValue = summary[columnKey as keyof typeof summary];

      // 根据语言切换字段
      const isChinese = intl.locale === "zh"; // 假设中文为 "zh"
      switch (columnKey) {
        case "trend":
          return <p>{isChinese ? summary.trend_chinese : cellValue}</p>;
        case "viewpoint":
          return <p>{isChinese ? summary.viewpoint_chinese : cellValue}</p>;
        case "prediction":
          return <p>{isChinese ? summary.prediction_chinese : cellValue}</p>;
        case "created_at":
          return (
            <span>
              {dayjs
                .utc(cellValue)
                .tz(userTimeZone)
                .format("YYYY-MM-DD hh:mm:ss")}
            </span>
          );
        case "youtuber_count":
        case "bullish_count":
        case "bearish_count":
        case "neutral_count":
          return <span>{cellValue}</span>;
        default:
          return cellValue;
      }
    },
    [intl]
  );

  return (
    <Table
      aria-label="Summaries"
      bottomContent={bottomContent}
      topContent={topContent}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={"start"} allowsSorting={false}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No summaries found"} items={summaries}>
        {(item: Summary) => (
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
