import { actGetOrders } from "@/store/slices/admin/act/actGetOrders";
import { actUpdateOrderStatus } from "@/store/slices/admin/act/actUpdateOrderStatus";
import { actUpdatePaymentStatus } from "@/store/slices/admin/act/actUpdatePaymentStatus";
import { actUpdateShipmentStatus } from "@/store/slices/admin/act/actUpdateShipmentStatus";
import { type AppDispatch, type RootState } from "@/store/store";
import {
  ChevronDown,
  Package,
  MapPin,
  CreditCard,
  Truck,
  Receipt,
  ShoppingBag,
  Box,
  Check,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/* ─── Status configs ─────────────────────────────────────────────────────── */
const statusConfig: Record<
  string,
  { bg: string; text: string; dot: string; ring: string }
> = {
  pending: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-400",
    ring: "ring-1 ring-amber-200",
  },
  confirmed: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    dot: "bg-blue-400",
    ring: "ring-1 ring-blue-200",
  },
  shipped: {
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    dot: "bg-indigo-400",
    ring: "ring-1 ring-indigo-200",
  },
  delivered: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
    ring: "ring-1 ring-emerald-200",
  },
  cancelled: {
    bg: "bg-red-50",
    text: "text-red-600",
    dot: "bg-red-400",
    ring: "ring-1 ring-red-200",
  },
};

const paymentConfig: Record<
  string,
  { bg: string; text: string; ring: string }
> = {
  paid: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    ring: "ring-1 ring-emerald-200",
  },
  unpaid: {
    bg: "bg-gray-100",
    text: "text-gray-500",
    ring: "ring-1 ring-gray-200",
  },
  refunded: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    ring: "ring-1 ring-orange-200",
  },
};

/* ─── Status option definitions ──────────────────────────────────────────── */
const ORDER_STATUS_OPTIONS = [
  { value: "confirmed", label: "Confirmed", color: "text-blue-600 bg-blue-50 ring-blue-200 hover:bg-blue-100" },
  { value: "processing", label: "Processing", color: "text-purple-600 bg-purple-50 ring-purple-200 hover:bg-purple-100" },
  { value: "shipped", label: "Shipped", color: "text-indigo-600 bg-indigo-50 ring-indigo-200 hover:bg-indigo-100" },
  { value: "out_for_delivery", label: "Out for Delivery", color: "text-cyan-600 bg-cyan-50 ring-cyan-200 hover:bg-cyan-100" },
  { value: "delivered", label: "Delivered", color: "text-emerald-600 bg-emerald-50 ring-emerald-200 hover:bg-emerald-100" },
  { value: "cancelled", label: "Cancelled", color: "text-red-600 bg-red-50 ring-red-200 hover:bg-red-100" },
  { value: "refunded", label: "Refunded", color: "text-orange-600 bg-orange-50 ring-orange-200 hover:bg-orange-100" },
] as const;

const PAYMENT_STATUS_OPTIONS = [
  { value: "pending", label: "Pending", color: "text-amber-600 bg-amber-50 ring-amber-200 hover:bg-amber-100" },
  { value: "completed", label: "Completed", color: "text-emerald-600 bg-emerald-50 ring-emerald-200 hover:bg-emerald-100" },
  { value: "failed", label: "Failed", color: "text-red-600 bg-red-50 ring-red-200 hover:bg-red-100" },
  { value: "refunded", label: "Refunded", color: "text-orange-600 bg-orange-50 ring-orange-200 hover:bg-orange-100" },
  { value: "partially_refunded", label: "Partial Refund", color: "text-yellow-600 bg-yellow-50 ring-yellow-200 hover:bg-yellow-100" },
] as const;

const SHIPMENT_STATUS_OPTIONS = [
  { value: "pending", label: "Pending", color: "text-amber-600 bg-amber-50 ring-amber-200 hover:bg-amber-100" },
  { value: "shipped", label: "Shipped", color: "text-indigo-600 bg-indigo-50 ring-indigo-200 hover:bg-indigo-100" },
  { value: "in_transit", label: "In Transit", color: "text-blue-600 bg-blue-50 ring-blue-200 hover:bg-blue-100" },
  { value: "out_for_delivery", label: "Out for Delivery", color: "text-cyan-600 bg-cyan-50 ring-cyan-200 hover:bg-cyan-100" },
  { value: "delivered", label: "Delivered", color: "text-emerald-600 bg-emerald-50 ring-emerald-200 hover:bg-emerald-100" },
  { value: "delayed", label: "Delayed", color: "text-orange-600 bg-orange-50 ring-orange-200 hover:bg-orange-100" },
  { value: "returned", label: "Returned", color: "text-red-600 bg-red-50 ring-red-200 hover:bg-red-100" },
] as const;

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const formatTime = (d: string) =>
  new Date(d).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

const fmt = (n: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(n);

/* ─── Atoms ───────────────────────────────────────────────────────────────── */
const StatusBadge = ({ status }: { status: string }) => {
  const cfg = statusConfig[status] ?? {
    bg: "bg-gray-100",
    text: "text-gray-600",
    dot: "bg-gray-400",
    ring: "ring-1 ring-gray-200",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize ${cfg.bg} ${cfg.text} ${cfg.ring}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
      {status}
    </span>
  );
};

const PaymentBadge = ({ status }: { status: string }) => {
  const cfg = paymentConfig[status] ?? {
    bg: "bg-gray-100",
    text: "text-gray-500",
    ring: "ring-1 ring-gray-200",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize ${cfg.bg} ${cfg.text} ${cfg.ring}`}
    >
      {status}
    </span>
  );
};

const InfoCard = ({
  icon,
  title,
  iconBg,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  iconBg: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
    <div className="flex items-center gap-2.5 mb-3.5">
      <div
        className={`w-7 h-7 rounded-lg flex items-center justify-center ${iconBg}`}
      >
        {icon}
      </div>
      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
        {title}
      </span>
    </div>
    {children}
  </div>
);

/* ─── StatusSelector ──────────────────────────────────────────────────────── */
const StatusSelector = <T extends string>({
  label,
  icon,
  currentStatus,
  options,
  loading,
  onSelect,
}: {
  label: string;
  icon: React.ReactNode;
  currentStatus: string;
  options: readonly { value: T; label: string; color: string }[];
  loading: boolean;
  onSelect: (value: T) => void;
}) => {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center">
            {icon}
          </div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {label}
          </span>
        </div>
        {loading && (
          <Loader2 size={12} className="text-indigo-400 animate-spin" />
        )}
      </div>

      {/* Pill grid */}
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const isActive =
            currentStatus?.toLowerCase() === opt.value.toLowerCase();
          return (
            <button
              key={opt.value}
              disabled={loading || isActive}
              onClick={() => onSelect(opt.value)}
              className={`
                inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold
                ring-1 transition-all duration-150
                ${isActive
                  ? `${opt.color} ring-current opacity-100 cursor-default`
                  : `${opt.color} opacity-60 hover:opacity-100 cursor-pointer`
                }
                disabled:cursor-not-allowed
              `}
            >
              {isActive && <Check size={9} strokeWidth={3} />}
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* ─── Main Component ──────────────────────────────────────────────────────── */
const Orders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.getOrders);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  // Per-order loading state for each status type
  const [loadingMap, setLoadingMap] = useState<
    Record<string, { order?: boolean; payment?: boolean; shipment?: boolean }>
  >({});

  const setLoading = (
    orderId: string,
    type: "order" | "payment" | "shipment",
    value: boolean,
  ) => {
    setLoadingMap((prev) => ({
      ...prev,
      [orderId]: { ...prev[orderId], [type]: value },
    }));
  };

  const toggle = (id: string) =>
    setExpandedOrders((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  useEffect(() => {
    dispatch(actGetOrders());
  }, [dispatch]);

  const orders = data?.orders ?? [];

  /* ── Handlers ── */
  const handleOrderStatus = async (
    orderId: string,
    status: Parameters<typeof actUpdateOrderStatus>[0]["status"],
  ) => {
    setLoading(orderId, "order", true);
    await dispatch(actUpdateOrderStatus({ orderId, status }));
    dispatch(actGetOrders());
    setLoading(orderId, "order", false);
  };

  const handlePaymentStatus = async (
    orderId: string,
    status: Parameters<typeof actUpdatePaymentStatus>[0]["status"],
  ) => {
    setLoading(orderId, "payment", true);
    await dispatch(actUpdatePaymentStatus({ orderId, status }));
    dispatch(actGetOrders());
    setLoading(orderId, "payment", false);
  };

  const handleShipmentStatus = async (
    orderId: string,
    status: Parameters<typeof actUpdateShipmentStatus>[0]["status"],
  ) => {
    setLoading(orderId, "shipment", true);
    await dispatch(actUpdateShipmentStatus({ orderId, status }));
    dispatch(actGetOrders());
    setLoading(orderId, "shipment", false);
  };

  return (
    <div className="bg-[#F7F8FC] min-h-screen p-4 sm:p-6 font-[system-ui]">
      {/* ── Page header ── */}
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
            <ShoppingBag size={16} className="text-indigo-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight leading-tight">
              Orders
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              {orders.length} total order{orders.length !== 1 ? "s" : ""}
              {data?.pagination &&
                ` · Page ${data.pagination.currentPage} of ${data.pagination.totalPages}`}
            </p>
          </div>
        </div>

        {/* Quick status summary */}
        {orders.length > 0 && (
          <div className="hidden sm:flex items-center gap-2 flex-wrap">
            {(["pending", "shipped", "delivered", "cancelled"] as const).map(
              (s) => {
                const count = orders.filter(
                  (o) =>
                    o.orderStatus === s ||
                    (s === "cancelled" && o.orderStatus === "Cancelled"),
                ).length;
                if (!count) return null;
                const cfg = statusConfig[s];
                return (
                  <span
                    key={s}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${cfg.bg} ${cfg.text} ${cfg.ring}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                    {count} {s}
                  </span>
                );
              },
            )}
          </div>
        )}
      </div>

      {/* ── Table card ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/80">
                {[
                  { label: "Order", align: "text-left" },
                  { label: "Customer & Items", align: "text-left" },
                  { label: "Date", align: "text-center" },
                  { label: "Amount", align: "text-center" },
                  { label: "Payment", align: "text-center" },
                  { label: "Status", align: "text-center" },
                  { label: "", align: "w-10" },
                ].map((h, i) => (
                  <th
                    key={i}
                    className={`py-3.5 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em] ${h.align}`}
                  >
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {orders.length > 0 ? (
                orders.map((order) => {
                  const isExpanded = expandedOrders.has(order._id);
                  const loading = loadingMap[order._id] ?? {};

                  return (
                    <>
                      {/* ── Main row ── */}
                      <tr
                        key={order._id}
                        onClick={() => toggle(order._id)}
                        className={`group cursor-pointer transition-colors duration-150 ${
                          isExpanded ? "bg-indigo-50/40" : "hover:bg-gray-50/80"
                        }`}
                      >
                        {/* Order # */}
                        <td className="py-4 px-4">
                          <p className="text-sm font-bold text-gray-900 tracking-tight">
                            #{order.orderNumber}
                          </p>
                          <p className="text-[11px] text-gray-400 font-mono mt-0.5">
                            …{order._id.slice(-8)}
                          </p>
                        </td>

                        {/* Customer + items */}
                        <td className="py-4 px-4">
                          <p className="text-sm font-semibold text-gray-800 truncate max-w-[200px]">
                            {order.shippingAddress?.name ?? "—"}
                          </p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <div className="flex -space-x-1">
                              {order.items.slice(0, 4).map((item, idx) =>
                                item.productSnapshot?.images?.[0] ? (
                                  <img
                                    key={idx}
                                    src={item.productSnapshot.images[0]}
                                    alt={item.name}
                                    className="w-5 h-5 rounded-md object-cover border-2 border-white shadow-sm"
                                  />
                                ) : (
                                  <div
                                    key={idx}
                                    className="w-5 h-5 rounded-md bg-gray-100 border-2 border-white flex items-center justify-center"
                                  >
                                    <Box size={9} className="text-gray-400" />
                                  </div>
                                ),
                              )}
                            </div>
                            <span className="text-xs text-gray-400 truncate max-w-[140px]">
                              {order.items.map((i) => i.name).join(", ")}
                            </span>
                            {order.items.length > 1 && (
                              <span className="text-[10px] text-gray-400 flex-shrink-0">
                                · {order.items.length} items
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Date */}
                        <td className="py-4 px-4 text-center">
                          <p className="text-sm text-gray-700">
                            {formatDate(order.createdAt)}
                          </p>
                          <p className="text-[11px] text-gray-400 mt-0.5">
                            {formatTime(order.createdAt)}
                          </p>
                        </td>

                        {/* Amount */}
                        <td className="py-4 px-4 text-center">
                          <p className="text-sm font-bold text-gray-900 tabular-nums">
                            {fmt(order.totalAmount, order.currency)}
                          </p>
                          <p className="text-[11px] text-gray-400 mt-0.5">
                            {order.items.reduce((s, i) => s + i.quantity, 0)}{" "}
                            unit
                            {order.items.reduce((s, i) => s + i.quantity, 0) !==
                            1
                              ? "s"
                              : ""}
                          </p>
                        </td>

                        {/* Payment */}
                        <td className="py-4 px-4 text-center">
                          <PaymentBadge status={order.paymentStatus} />
                          <p className="text-[11px] text-gray-400 mt-1.5 capitalize">
                            {order.paymentMethod}
                          </p>
                        </td>

                        {/* Status */}
                        <td className="py-4 px-4 text-center">
                          <StatusBadge status={order.orderStatus} />
                          {order.shipmentStatus &&
                            order.shipmentStatus !== order.orderStatus && (
                              <p className="text-[11px] text-gray-400 mt-1 capitalize flex items-center justify-center gap-1">
                                <Truck size={9} className="text-gray-400" />
                                {order.shipmentStatus}
                              </p>
                            )}
                        </td>

                        {/* Expand */}
                        <td className="py-4 px-3 text-center">
                          <div
                            className={`w-7 h-7 rounded-full mx-auto flex items-center justify-center transition-all duration-200 ${
                              isExpanded
                                ? "bg-indigo-100 text-indigo-600 rotate-180"
                                : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                            }`}
                          >
                            <ChevronDown size={13} />
                          </div>
                        </td>
                      </tr>

                      {/* ── Expanded detail panel ── */}
                      {isExpanded && (
                        <tr
                          key={`${order._id}-expanded`}
                          className="bg-gradient-to-b from-indigo-50/30 to-white"
                        >
                          <td colSpan={7} className="px-4 py-5">
                            {/* ── Info cards row ── */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                              {/* Shipping */}
                              <InfoCard
                                icon={
                                  <MapPin size={13} className="text-indigo-500" />
                                }
                                title="Shipping To"
                                iconBg="bg-indigo-50"
                              >
                                <p className="text-sm font-semibold text-gray-800">
                                  {order.shippingAddress.name}
                                </p>
                                {order.shippingAddress.companyName && (
                                  <p className="text-xs text-gray-500 mt-0.5">
                                    {order.shippingAddress.companyName}
                                  </p>
                                )}
                                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                                  {order.shippingAddress.streetAddress}
                                  <br />
                                  {order.shippingAddress.city}
                                </p>
                                <div className="mt-2.5 pt-2.5 border-t border-gray-50 space-y-0.5">
                                  <p className="text-xs text-gray-500">
                                    {order.shippingAddress.phoneNumber}
                                  </p>
                                  <p className="text-xs text-gray-500 truncate">
                                    {order.shippingAddress.email}
                                  </p>
                                </div>
                              </InfoCard>

                              {/* Items */}
                              <InfoCard
                                icon={
                                  <Package size={13} className="text-amber-500" />
                                }
                                title="Order Items"
                                iconBg="bg-amber-50"
                              >
                                <div className="space-y-3">
                                  {order.items.map((item, idx) => (
                                    <div
                                      key={idx}
                                      className="flex items-center gap-2.5"
                                    >
                                      {item.productSnapshot?.images?.[0] ? (
                                        <img
                                          src={item.productSnapshot.images[0]}
                                          alt={item.name}
                                          className="w-10 h-10 rounded-lg object-cover border border-gray-100 flex-shrink-0"
                                        />
                                      ) : (
                                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                          <Package
                                            size={12}
                                            className="text-gray-400"
                                          />
                                        </div>
                                      )}
                                      <div className="min-w-0 flex-1">
                                        <p className="text-xs font-semibold text-gray-800 truncate">
                                          {item.name}
                                        </p>
                                        <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                                          {item.variationSku}
                                        </p>
                                        <div className="flex items-center justify-between mt-0.5">
                                          <span className="text-[11px] text-gray-400">
                                            {fmt(item.price)} × {item.quantity}
                                          </span>
                                          <span className="text-[11px] font-bold text-gray-700">
                                            {fmt(item.totalPrice)}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </InfoCard>

                              {/* Breakdown */}
                              <InfoCard
                                icon={
                                  <Receipt size={13} className="text-emerald-500" />
                                }
                                title="Breakdown"
                                iconBg="bg-emerald-50"
                              >
                                <div className="space-y-2">
                                  {[
                                    { label: "Subtotal", value: order.subtotal },
                                    { label: "Shipping", value: order.shippingCost },
                                    { label: "Tax", value: order.taxAmount },
                                    ...(order.itemsDiscount > 0
                                      ? [{ label: "Item Discount", value: -order.itemsDiscount }]
                                      : []),
                                    ...(order.couponDiscount > 0
                                      ? [{ label: "Coupon", value: -order.couponDiscount }]
                                      : []),
                                  ].map(({ label, value }) => (
                                    <div
                                      key={label}
                                      className="flex justify-between items-center"
                                    >
                                      <span className="text-xs text-gray-500">
                                        {label}
                                      </span>
                                      <span
                                        className={`text-xs font-semibold tabular-nums ${
                                          value < 0 ? "text-emerald-600" : "text-gray-700"
                                        }`}
                                      >
                                        {value < 0 ? "−" : ""}
                                        {fmt(Math.abs(value), order.currency)}
                                      </span>
                                    </div>
                                  ))}
                                  <div className="border-t border-gray-100 pt-2 mt-1 flex justify-between items-center">
                                    <span className="text-sm font-bold text-gray-800">
                                      Total
                                    </span>
                                    <span className="text-sm font-bold text-gray-900 tabular-nums">
                                      {fmt(order.totalAmount, order.currency)}
                                    </span>
                                  </div>
                                </div>
                              </InfoCard>

                              {/* Transaction */}
                              <InfoCard
                                icon={
                                  <CreditCard size={13} className="text-blue-500" />
                                }
                                title="Transaction"
                                iconBg="bg-blue-50"
                              >
                                <div className="space-y-3">
                                  {order.transactionId && (
                                    <div>
                                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                                        Transaction ID
                                      </p>
                                      <p className="text-[11px] font-mono text-gray-600 break-all leading-relaxed">
                                        {order.transactionId}
                                      </p>
                                    </div>
                                  )}
                                  <div className="grid grid-cols-2 gap-3">
                                    <div>
                                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                                        Method
                                      </p>
                                      <p className="text-xs text-gray-700 capitalize">
                                        {order.paymentMethod}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                                        Shipment
                                      </p>
                                      <p className="text-xs text-gray-700 capitalize">
                                        {order.shipmentStatus}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                                        Created
                                      </p>
                                      <p className="text-xs text-gray-700">
                                        {formatDate(order.createdAt)}
                                      </p>
                                    </div>
                                    {order.paidAt && (
                                      <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                                          Paid
                                        </p>
                                        <p className="text-xs text-gray-700">
                                          {formatDate(order.paidAt)}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                  {(order.isCancellable || order.isEditable) && (
                                    <div className="flex gap-2 flex-wrap pt-0.5">
                                      {order.isCancellable && (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-600 ring-1 ring-red-100 uppercase tracking-wide">
                                          Cancellable
                                        </span>
                                      )}
                                      {order.isEditable && (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 ring-1 ring-blue-100 uppercase tracking-wide">
                                          Editable
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </InfoCard>
                            </div>

                            {/* ── Status Controls ── */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              {/* Order Status */}
                              <StatusSelector
                                label="Order Status"
                                icon={<Package size={12} className="text-gray-500" />}
                                currentStatus={order.orderStatus}
                                options={ORDER_STATUS_OPTIONS}
                                loading={!!loading.order}
                                onSelect={(status) =>
                                  handleOrderStatus(order._id, status)
                                }
                              />

                              {/* Payment Status */}
                              <StatusSelector
                                label="Payment Status"
                                icon={<CreditCard size={12} className="text-gray-500" />}
                                currentStatus={order.paymentStatus}
                                options={PAYMENT_STATUS_OPTIONS}
                                loading={!!loading.payment}
                                onSelect={(status) =>
                                  handlePaymentStatus(order._id, status)
                                }
                              />

                              {/* Shipment Status */}
                              <StatusSelector
                                label="Shipment Status"
                                icon={<Truck size={12} className="text-gray-500" />}
                                currentStatus={order.shipmentStatus}
                                options={SHIPMENT_STATUS_OPTIONS}
                                loading={!!loading.shipment}
                                onSelect={(status) =>
                                  handleShipmentStatus(order._id, status)
                                }
                              />
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-24 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
                        <ShoppingBag size={22} className="text-gray-300" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-500 text-sm">
                          No orders yet
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Orders will appear here once placed
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination footer ── */}
        {data?.pagination && (
          <div className="px-5 py-3.5 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
            <span className="text-xs text-gray-400">
              {orders.length} orders · Page {data.pagination.currentPage} of{" "}
              {data.pagination.totalPages}
            </span>
            <div className="flex items-center gap-1">
              {Array.from(
                { length: Math.min(data.pagination.totalPages, 5) },
                (_, i) => i + 1,
              ).map((p) => (
                <button
                  key={p}
                  className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors ${
                    p === data.pagination.currentPage
                      ? "bg-indigo-500 text-white shadow-sm"
                      : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                  }`}
                >
                  {p}
                </button>
              ))}
              {data.pagination.totalPages > 5 && (
                <span className="text-xs text-gray-400 px-1">…</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;