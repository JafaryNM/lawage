"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle, Mail, MessageSquare, Phone, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteEnquiry, useEnquiries, useToggleEnquiryRead } from "@/lib/api/queries";
import type { Enquiry } from "@/lib/enquiries";

export function EnquiriesManager() {
  const enquiriesQuery = useEnquiries();
  const toggleReadMutation = useToggleEnquiryRead();
  const deleteMutation = useDeleteEnquiry();

  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  const list = enquiriesQuery.data ?? [];
  const filtered = list.filter((e) => {
    if (filter === "unread") return !e.isRead;
    if (filter === "read") return e.isRead;
    return true;
  });

  const unreadCount = list.filter((e) => !e.isRead).length;

  const handleToggleRead = (id: number, current: boolean) => {
    toggleReadMutation.mutate(
      { id, isRead: !current },
      {
        onSuccess: () => {
          toast.success(!current ? "Marked as read." : "Marked as unread.");
          if (selectedEnquiry && selectedEnquiry.id === id) {
            setSelectedEnquiry({ ...selectedEnquiry, isRead: !current });
          }
        },
      },
    );
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Enquiry deleted.");
        if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
      },
      onError: (err) => toast.error(err.message || "Failed to delete enquiry."),
    });
  };

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl text-foreground md:text-4xl">
            Client <span className="text-brand">Enquiries</span>
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Messages and consultation requests sent by clients through the website contact form.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(["all", "unread", "read"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`rounded-md px-3.5 py-1.5 text-xs uppercase tracking-wider transition-colors ${
                filter === tab
                  ? "bg-brand text-white font-medium"
                  : "bg-white text-muted-foreground hover:bg-black/5"
              }`}
            >
              {tab === "all" ? `All (${list.length})` : tab === "unread" ? `Unread (${unreadCount})` : "Read"}
            </button>
          ))}
        </div>
      </div>

      {enquiriesQuery.error && (
        <Alert variant="destructive" className="mt-8 border-gold/40 bg-white [&>svg]:text-gold">
          <AlertCircle className="size-4" />
          <AlertDescription className="text-foreground">{enquiriesQuery.error.message}</AlertDescription>
        </Alert>
      )}

      {enquiriesQuery.isLoading && (
        <div className="mt-8 space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28 w-full rounded-none bg-white" />
          ))}
        </div>
      )}

      {enquiriesQuery.isSuccess && filtered.length === 0 && (
        <div className="mt-8 bg-white p-12 text-center text-muted-foreground shadow-sm">
          <MessageSquare className="mx-auto size-10 text-brand/30" />
          <p className="mt-4 text-lg">No enquiries found in this view.</p>
          <p className="mt-1 text-sm">New messages submitted from the contact page will appear here.</p>
        </div>
      )}

      {enquiriesQuery.isSuccess && filtered.length > 0 && (
        <div className="mt-8 space-y-3">
          {filtered.map((enquiry) => (
            <article
              key={enquiry.id}
              className={`flex flex-col justify-between gap-4 rounded-[4px] bg-white p-5 shadow-[0_12px_32px_rgba(33,28,79,0.05)] transition-colors sm:flex-row sm:items-center ${
                !enquiry.isRead ? "border-l-4 border-gold" : "opacity-85"
              }`}
            >
              <div
                className="flex-1 cursor-pointer"
                onClick={() => {
                  setSelectedEnquiry(enquiry);
                  if (!enquiry.isRead) {
                    handleToggleRead(enquiry.id, false);
                  }
                }}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-foreground">{enquiry.name}</span>
                  {!enquiry.isRead ? (
                    <Badge className="bg-gold text-white text-[0.65rem] uppercase">Unread</Badge>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground text-[0.65rem] uppercase">
                      Read
                    </Badge>
                  )}
                  {enquiry.area && (
                    <Badge variant="outline" className="border-brand/20 bg-brand/5 text-[0.7rem] text-brand">
                      {enquiry.area}
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {new Date(enquiry.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Mail className="size-3 text-brand" /> {enquiry.email}
                  </span>
                  {enquiry.phone && (
                    <span className="flex items-center gap-1.5">
                      <Phone className="size-3 text-brand" /> {enquiry.phone}
                    </span>
                  )}
                </div>

                <p className="mt-2.5 line-clamp-2 text-sm text-foreground/80 leading-relaxed">
                  {enquiry.message}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2 border-t border-black/5 pt-3 sm:border-t-0 sm:pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleRead(enquiry.id, enquiry.isRead)}
                  className="text-xs"
                >
                  {enquiry.isRead ? "Mark Unread" : "Mark Read"}
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="size-9 p-0 border-gold/30 text-gold shadow-none hover:border-gold hover:bg-gold hover:text-white"
                      title="Delete enquiry"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Enquiry</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this enquiry from <strong className="text-foreground">{enquiry.name}</strong>?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(enquiry.id)}
                        className="bg-destructive hover:bg-destructive/90 text-white"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* DETAIL MODAL */}
      <Dialog open={Boolean(selectedEnquiry)} onOpenChange={(open) => !open && setSelectedEnquiry(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedEnquiry?.name}</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Submitted on {selectedEnquiry && new Date(selectedEnquiry.createdAt).toLocaleString()}
            </DialogDescription>
          </DialogHeader>

          {selectedEnquiry && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4 rounded-md bg-muted/40 p-4 text-xs">
                <div>
                  <span className="text-muted-foreground">Email:</span>
                  <a
                    href={`mailto:${selectedEnquiry.email}`}
                    className="mt-0.5 block font-medium text-brand hover:underline"
                  >
                    {selectedEnquiry.email}
                  </a>
                </div>
                <div>
                  <span className="text-muted-foreground">Phone:</span>
                  <p className="mt-0.5 font-medium text-foreground">
                    {selectedEnquiry.phone || "Not provided"}
                  </p>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Practice Area:</span>
                  <p className="mt-0.5 font-medium text-foreground">
                    {selectedEnquiry.area || "General enquiry"}
                  </p>
                </div>
              </div>

              <div>
                <span className="text-xs font-medium text-foreground">Message:</span>
                <p className="mt-2 whitespace-pre-wrap rounded-md border border-border bg-white p-4 text-sm leading-relaxed text-foreground">
                  {selectedEnquiry.message}
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button asChild variant="outline" size="sm">
                  <a href={`mailto:${selectedEnquiry.email}?subject=Re: Your enquiry with LawAge Advocates`}>
                    <Mail className="mr-1.5 size-3.5" /> Reply by Email
                  </a>
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => setSelectedEnquiry(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

