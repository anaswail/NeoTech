import { actGetMyOrders } from "@/store/slices/orders/act/actGetMyOrders";
import { actCancelOrder } from "@/store/slices/orders/act/actCancelOrder";
import { actRefundRequest } from "@/store/slices/orders/act/actRefundRequest";
import type { AppDispatch, RootState } from "@/store/store";
import {
  ChevronDown,
  Package,
  MapPin,
  CreditCard,
  Truck,
  Receipt,
  ShoppingBag,
  Box,
  ExternalLink,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  X,
  RotateCcw,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

/* ─── Status configs ─────────────────────────────────────────────────────── */
const orderStatusConfig: Record<
  string,
  { bg: string; text: string; dot: string; ring: string; icon: React.ReactNode }
> = {
  pending: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-400",
    ring: "ring-1 ring-amber-200",
    icon: <Clock size={10} />,
  },
  confirmed: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    dot: "bg-blue-400",
    ring: "ring-1 ring-blue-200",
    icon: <CheckCircle2 size={10} />,
  },
  processing: {
    bg: "bg-purple-50",
    text: "text-purple-700",
    dot: "bg-purple-400",
    ring: "ring-1 ring-purple-200",
    icon: <Package size={10} />,
  },
  shipped: {
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    dot: "bg-indigo-400",
    ring: "ring-1 ring-indigo-200",
    icon: <Truck size={10} />,
  },
  delivered: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
    ring: "ring-1 ring-emerald-200",
    icon: <CheckCircle2 size={10} />,
  },
  cancelled: {
    bg: "bg-red-50",
    text: "text-red-600",
    dot: "bg-red-400",
    ring: "ring-1 ring-red-200",
    icon: <XCircle size={10} />,
  },
};

const paymentStatusConfig: Record<
  string,
  { bg: string; text: string; ring: string }
> = {
  pending: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    ring: "ring-1 ring-amber-200",
  },
  completed: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    ring: "ring-1 ring-emerald-200",
  },
  failed: {
    bg: "bg-red-50",
    text: "text-red-600",
    ring: "ring-1 ring-red-200",
  },
  refunded: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    ring: "ring-1 ring-orange-200",
  },
};

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
const OrderStatusBadge = ({ status }: { status: string }) => {
  const key = status?.toLowerCase();
  const cfg = orderStatusConfig[key] ?? {
    bg: "bg-gray-100",
    text: "text-gray-600",
    dot: "bg-gray-400",
    ring: "ring-1 ring-gray-200",
    icon: <AlertCircle size={10} />,
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize ${cfg.bg} ${cfg.text} ${cfg.ring}`}
    >
      {cfg.icon}
      {status}
    </span>
  );
};

const PaymentBadge = ({ status }: { status: string }) => {
  const key = status?.toLowerCase();
  const cfg = paymentStatusConfig[key] ?? {
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

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex justify-between items-start gap-4">
    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex-shrink-0 mt-0.5">
      {label}
    </span>
    <span className="text-xs text-gray-700 text-right">{value}</span>
  </div>
);

/* ─── Cancel Modal ────────────────────────────────────────────────────────── */
interface CancelModalProps {
  order: any;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  loading: boolean;
}

const CancelModal = ({
  order,
  onClose,
  onConfirm,
  loading,
}: CancelModalProps) => {
  const [reason, setReason] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const isReasonValid = reason.trim().length >= 10;

  const handleSubmit = () => {
    if (!isReasonValid) return;
    onConfirm(reason.trim());
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center">
              <XCircle size={15} className="text-red-500" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Cancel Order</p>
              <p className="text-[11px] text-gray-400 font-mono">
                {order.orderNumber}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          >
            <X size={13} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-4">
          <p className="text-sm text-gray-500">
            Please tell us why you'd like to cancel this order. This helps us
            improve.
          </p>

          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">
              Cancellation Reason <span className="text-red-400">*</span>
            </label>
            <textarea
              ref={inputRef}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Changed my mind, found a better price…"
              rows={3}
              className="w-full text-sm text-gray-700 placeholder-gray-300 border border-gray-200 rounded-xl px-3.5 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-300 transition-all"
            />
            <p className="text-[10px] mt-1 text-right">
              {reason.length} chars
              {!isReasonValid && reason.trim().length > 0 ? (
                <span className="text-red-400 ml-2">
                  Minimum 10 characters required.
                </span>
              ) : null}
            </p>
          </div>

          {/* Order summary */}
          <div className="bg-gray-50 rounded-xl p-3 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Order total</span>
              <span className="font-semibold text-gray-800">
                {fmt(order.totalAmount, order.currency)}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Items</span>
              <span className="text-gray-700">
                {order.items.length} item{order.items.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2.5 px-5 py-4 border-t border-gray-100 bg-gray-50/50">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Keep Order
          </button>
          <button
            onClick={handleSubmit}
            disabled={!reason.trim() || loading}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors shadow-sm shadow-red-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Cancelling…
              </>
            ) : (
              "Cancel Order"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Refund Modal ────────────────────────────────────────────────────────── */
interface RefundModalProps {
  order: any;
  onClose: () => void;
  onConfirm: (reason: string, amount: number) => void;
  loading: boolean;
}

const RefundModal = ({
  order,
  onClose,
  onConfirm,
  loading,
}: RefundModalProps) => {
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState<string>(String(order.totalAmount));
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const parsedAmount = parseFloat(amount);
  const isAmountValid =
    !isNaN(parsedAmount) &&
    parsedAmount > 0 &&
    parsedAmount <= order.totalAmount;
  const isReasonValid = reason.trim().length >= 10;

  const handleSubmit = () => {
    if (!isReasonValid || !isAmountValid) return;
    onConfirm(reason.trim(), parsedAmount);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center">
              <RotateCcw size={14} className="text-orange-500" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Request Refund</p>
              <p className="text-[11px] text-gray-400 font-mono">
                {order.orderNumber}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          >
            <X size={13} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-4">
          <p className="text-sm text-gray-500">
            Submit a refund request for this order. Partial refunds are allowed
            up to the order total.
          </p>

          {/* Amount field */}
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">
              Refund Amount <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400">
                {order.currency}
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min={0.01}
                max={order.totalAmount}
                step={0.01}
                className={`w-full text-sm text-gray-700 border rounded-xl pl-14 pr-3.5 py-2.5 focus:outline-none focus:ring-2 transition-all ${
                  amount && !isAmountValid
                    ? "border-red-200 focus:ring-red-200 focus:border-red-300"
                    : "border-gray-200 focus:ring-orange-200 focus:border-orange-300"
                }`}
              />
            </div>
            <div className="flex justify-between mt-1">
              {amount && !isAmountValid && (
                <p className="text-[10px] text-red-400">
                  Must be between 0.01 and{" "}
                  {fmt(order.totalAmount, order.currency)}
                </p>
              )}
              <button
                onClick={() => setAmount(String(order.totalAmount))}
                className="text-[10px] text-orange-500 hover:text-orange-600 font-semibold ml-auto transition-colors"
              >
                Full refund ({fmt(order.totalAmount, order.currency)})
              </button>
            </div>
          </div>

          {/* Reason field */}
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">
              Reason <span className="text-red-400">*</span>
            </label>
            <textarea
              ref={inputRef}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Item arrived damaged, wrong product received…"
              rows={3}
              className="w-full text-sm text-gray-700 placeholder-gray-300 border border-gray-200 rounded-xl px-3.5 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 transition-all"
            />
            <p className="text-[10px] mt-1 text-right">
              {reason.length} chars
              {!isReasonValid && reason.trim().length > 0 ? (
                <span className="text-red-400 ml-2">
                  Minimum 10 characters required.
                </span>
              ) : null}
            </p>
          </div>

          {/* Order summary */}
          <div className="bg-orange-50/60 rounded-xl p-3 space-y-1.5 border border-orange-100">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Order total</span>
              <span className="font-semibold text-gray-800">
                {fmt(order.totalAmount, order.currency)}
              </span>
            </div>
            {isAmountValid && parsedAmount !== order.totalAmount && (
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Remaining after refund</span>
                <span className="font-semibold text-orange-700">
                  {fmt(order.totalAmount - parsedAmount, order.currency)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2.5 px-5 py-4 border-t border-gray-100 bg-gray-50/50">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Dismiss
          </button>
          <button
            onClick={handleSubmit}
            disabled={!reason.trim() || !isAmountValid || loading}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-colors shadow-sm shadow-orange-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Submitting…
              </>
            ) : (
              "Submit Refund"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Component ──────────────────────────────────────────────────────── */
const LastOrders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector(
    (state: RootState) => state.getMyOrders,
  );
  const cancelState = useSelector((state: RootState) => state.cancelOrder);
  const refundState = useSelector((state: RootState) => state.refundOrder);

  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [cancelModal, setCancelModal] = useState<any | null>(null);
  const [refundModal, setRefundModal] = useState<any | null>(null);

  useEffect(() => {
    dispatch(actGetMyOrders());
  }, [dispatch]);

  // Close modals and re-fetch on success
  useEffect(() => {
    if (cancelState.loading === "fulfilled" && cancelModal) {
      setCancelModal(null);
      dispatch(actGetMyOrders());
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Order Canceled Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (cancelState.loading === "rejected" && cancelModal) {
      setCancelModal(null);

      Swal.fire({
        position: "top",
        icon: "error",
        title: cancelState?.error?.message,
        showConfirmButton: false,
        timer: 3000,
      });
    }
  }, [cancelState.loading]);

  useEffect(() => {
    if (refundState.loading === "fulfilled" && refundModal) {
      setRefundModal(null);
      dispatch(actGetMyOrders());
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Order refunded Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (refundState.loading === "rejected" && refundModal) {
      setRefundModal(null);
      Swal.fire({
        position: "top",
        icon: "error",
        title: refundState?.error?.message,
        showConfirmButton: false,
        timer: 3000,
      });
    }
  }, [refundState.loading]);

  const toggle = (id: string) =>
    setExpandedOrders((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const handleCancel = (reason: string) => {
    if (!cancelModal) return;
    dispatch(actCancelOrder({ reason, orderId: cancelModal._id }));
  };

  const handleRefund = (reason: string, amount: number) => {
    if (!refundModal) return;
    dispatch(actRefundRequest({ reason, amount, orderId: refundModal._id }));
  };

  // Handle both response shapes: direct array or wrapped { orders: [] }
  const orders = Array.isArray(data)
    ? data
    : ((data as any)?.data?.orders ?? (data as any)?.orders ?? []);

  if (loading === "pending") {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center animate-pulse">
          <ShoppingBag size={20} className="text-indigo-300" />
        </div>
        <p className="text-sm text-gray-400 font-medium">
          Loading your orders…
        </p>
      </div>
    );
  }

  if (loading === "rejected") {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
          <XCircle size={20} className="text-red-400" />
        </div>
        <p className="text-sm text-gray-500 font-medium">
          Failed to load orders
        </p>
        <button
          onClick={() => dispatch(actGetMyOrders())}
          className="text-xs text-indigo-500 hover:text-indigo-700 font-semibold transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
          <ShoppingBag size={24} className="text-gray-300" />
        </div>
        <div className="text-center">
          <p className="font-semibold text-gray-500 text-sm">No orders yet</p>
          <p className="text-xs text-gray-400 mt-0.5">
            Your order history will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
              <ShoppingBag size={14} className="text-indigo-500" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 leading-tight">
                My Orders
              </h2>
              <p className="text-[11px] text-gray-400 mt-0.5">
                {orders.length} order{orders.length !== 1 ? "s" : ""} total
              </p>
            </div>
          </div>
        </div>

        {/* Orders list */}
        <div className="space-y-3">
          {orders.map((order: any) => {
            const isExpanded = expandedOrders.has(order._id);
            const isPendingPayment =
              order.paymentStatus?.toLowerCase() === "pending" &&
              order.paymentUrl;
            const totalUnits = order.items.reduce(
              (s: number, i: any) => s + i.quantity,
              0,
            );

            return (
              <div
                key={order._id}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? "border-indigo-100 shadow-md shadow-indigo-50/80"
                    : "border-gray-100 shadow-sm hover:border-gray-200 hover:shadow"
                }`}
              >
                {/* ── Order row ── */}
                <div
                  onClick={() => toggle(order._id)}
                  className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 px-4 py-3.5 cursor-pointer transition-colors duration-150 ${
                    isExpanded
                      ? "bg-indigo-50/50"
                      : "bg-white hover:bg-gray-50/70"
                  }`}
                >
                  {/* Left: order number + items preview */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Item thumbnails */}
                    <div className="flex -space-x-1.5 flex-shrink-0">
                      {order.items.slice(0, 3).map((item: any, idx: number) =>
                        item.productSnapshot?.images?.[0] ? (
                          <img
                            key={idx}
                            src={item.productSnapshot.images[0]}
                            alt={item.name}
                            className="w-9 h-9 rounded-lg object-cover border-2 border-white shadow-sm"
                          />
                        ) : (
                          <div
                            key={idx}
                            className="w-9 h-9 rounded-lg bg-gray-100 border-2 border-white flex items-center justify-center"
                          >
                            <Box size={11} className="text-gray-400" />
                          </div>
                        ),
                      )}
                      {order.items.length > 3 && (
                        <div className="w-9 h-9 rounded-lg bg-gray-100 border-2 border-white flex items-center justify-center">
                          <span className="text-[10px] font-bold text-gray-500">
                            +{order.items.length - 3}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Order info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-bold text-gray-900 tracking-tight">
                          {order.orderNumber}
                        </p>
                        <OrderStatusBadge status={order.orderStatus} />
                      </div>
                      <p className="text-[11px] text-gray-400 mt-0.5 truncate">
                        {order.items.map((i: any) => i.name).join(", ")}
                        {totalUnits > 1 && ` · ${totalUnits} units`}
                      </p>
                    </div>
                  </div>

                  {/* Right: date + amount + payment + chevron */}
                  <div className="flex items-center gap-4 sm:gap-5 flex-shrink-0">
                    <div className="hidden sm:block text-right">
                      <p className="text-[11px] text-gray-500">
                        {formatDate(order.createdAt)}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {formatTime(order.createdAt)}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900 tabular-nums">
                        {fmt(order.totalAmount, order.currency)}
                      </p>
                      <div className="flex justify-end mt-0.5">
                        <PaymentBadge status={order.paymentStatus} />
                      </div>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                        isExpanded
                          ? "bg-indigo-100 text-indigo-600 rotate-180"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <ChevronDown size={13} />
                    </div>
                  </div>
                </div>

                {/* ── Expanded detail panel ── */}
                {isExpanded && (
                  <div className="bg-gradient-to-b from-indigo-50/20 to-white border-t border-indigo-100/60 px-4 py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                      {/* Shipping Address */}
                      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-md bg-indigo-50 flex items-center justify-center">
                            <MapPin size={11} className="text-indigo-500" />
                          </div>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            Shipping To
                          </span>
                        </div>
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
                      </div>

                      {/* Items */}
                      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-md bg-amber-50 flex items-center justify-center">
                            <Package size={11} className="text-amber-500" />
                          </div>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            Items
                          </span>
                        </div>
                        <div className="space-y-3">
                          {order.items.map((item: any, idx: number) => (
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
                                    {fmt(item.price, order.currency)} ×{" "}
                                    {item.quantity}
                                  </span>
                                  <span className="text-[11px] font-bold text-gray-700">
                                    {fmt(item.totalPrice, order.currency)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Breakdown */}
                      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-md bg-emerald-50 flex items-center justify-center">
                            <Receipt size={11} className="text-emerald-500" />
                          </div>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            Breakdown
                          </span>
                        </div>
                        <div className="space-y-2">
                          {[
                            { label: "Subtotal", value: order.subtotal },
                            { label: "Shipping", value: order.shippingCost },
                            { label: "Tax", value: order.taxAmount },
                            ...(order.itemsDiscount > 0
                              ? [
                                  {
                                    label: "Item Discount",
                                    value: -order.itemsDiscount,
                                  },
                                ]
                              : []),
                            ...(order.couponDiscount > 0
                              ? [
                                  {
                                    label: "Coupon",
                                    value: -order.couponDiscount,
                                  },
                                ]
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
                                  value < 0
                                    ? "text-emerald-600"
                                    : "text-gray-700"
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
                      </div>

                      {/* Transaction & Tracking */}
                      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-md bg-blue-50 flex items-center justify-center">
                            <CreditCard size={11} className="text-blue-500" />
                          </div>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            Details
                          </span>
                        </div>
                        <div className="space-y-2.5">
                          {order.transactionId && (
                            <InfoRow
                              label="Txn ID"
                              value={
                                <span className="font-mono text-[10px] text-gray-600 break-all">
                                  {order.transactionId}
                                </span>
                              }
                            />
                          )}
                          <InfoRow
                            label="Method"
                            value={
                              <span className="capitalize">
                                {order.paymentMethod.replace("_", " ")}
                              </span>
                            }
                          />
                          <InfoRow
                            label="Shipment"
                            value={
                              <div className="flex items-center gap-1 justify-end">
                                <Truck size={10} className="text-gray-400" />
                                <span className="capitalize">
                                  {order.shipmentStatus}
                                </span>
                              </div>
                            }
                          />
                          <InfoRow
                            label="Ordered"
                            value={formatDate(order.createdAt)}
                          />
                          {order.paidAt && (
                            <InfoRow
                              label="Paid"
                              value={formatDate(order.paidAt)}
                            />
                          )}
                          {order.shippedAt && (
                            <InfoRow
                              label="Shipped"
                              value={formatDate(order.shippedAt)}
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* ── Actions row ── */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {isPendingPayment && (
                        <a
                          href={order.paymentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold transition-colors shadow-sm shadow-indigo-200"
                        >
                          <CreditCard size={12} />
                          Complete Payment
                          <ExternalLink size={10} className="opacity-70" />
                        </a>
                      )}

                      {order.isCancellable && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCancelModal(order);
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold transition-colors ring-1 ring-red-100"
                        >
                          <XCircle size={12} />
                          Cancel Order
                        </button>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setRefundModal(order);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-600 text-xs font-semibold transition-colors ring-1 ring-orange-100"
                      >
                        <RotateCcw size={12} />
                        Request Refund
                      </button>
                    </div>

                    {/* Inline error feedback */}
                    {cancelState.loading === "rejected" &&
                      cancelState.error &&
                      cancelModal?._id === order._id && (
                        <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                          <AlertCircle size={11} />
                          {typeof cancelState.error === "string"
                            ? cancelState.error
                            : "Failed to cancel order. Please try again."}
                        </p>
                      )}
                    {refundState.loading === "rejected" &&
                      refundState.error &&
                      refundModal?._id === order._id && (
                        <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                          <AlertCircle size={11} />
                          {typeof refundState.error === "string"
                            ? refundState.error
                            : "Failed to submit refund. Please try again."}
                        </p>
                      )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Modals ── */}
      {cancelModal && (
        <CancelModal
          order={cancelModal}
          onClose={() => setCancelModal(null)}
          onConfirm={handleCancel}
          loading={cancelState.loading === "pending"}
        />
      )}
      {refundModal && (
        <RefundModal
          order={refundModal}
          onClose={() => setRefundModal(null)}
          onConfirm={handleRefund}
          loading={refundState.loading === "pending"}
        />
      )}
    </>
  );
};

export default LastOrders;
