"use client";

import Link from "next/link";
import { AlertCircle, ExternalLink, Pencil, Plus, Trash2 } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FlatIcon } from "@/components/site/FlatIcon";
import { useDeleteService, useServices } from "@/lib/api/queries";
import type { CmsService } from "@/lib/cms-server";

export function ServicesManager() {
  const servicesQuery = useServices();
  const deleteMutation = useDeleteService();
  const list = servicesQuery.data ?? [];

  const handleDelete = (id: number, title: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => toast.success(`"${title}" practice area has been deleted.`),
      onError: (err) => toast.error(err.message || "Failed to delete practice area."),
    });
  };

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl text-foreground md:text-4xl">
            Practice <span className="text-brand">Areas</span>
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Manage practice areas, legal services, scopes of practice, and service descriptions.
          </p>
        </div>
        <Button asChild className="h-11 px-5 text-xs font-normal uppercase tracking-[0.15em] hover:bg-brand-deep">
          <Link href="/admin/services/new">
            <Plus className="size-4" /> Add Practice Area
          </Link>
        </Button>
      </div>

      {servicesQuery.error && (
        <Alert variant="destructive" className="mt-8 border-gold/40 bg-white [&>svg]:text-gold">
          <AlertCircle className="size-4" />
          <AlertDescription className="text-foreground">{servicesQuery.error.message}</AlertDescription>
        </Alert>
      )}

      {servicesQuery.isLoading && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 w-full rounded-none bg-white" />
          ))}
        </div>
      )}

      {servicesQuery.isSuccess && list.length === 0 && (
        <div className="mt-8 bg-white p-12 text-center text-muted-foreground shadow-sm">
          <p className="text-lg">No practice areas found.</p>
          <p className="mt-1 text-sm">Click "Add Practice Area" to create your first legal service.</p>
        </div>
      )}

      {servicesQuery.isSuccess && list.length > 0 && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {list.map((service) => (
            <ServiceCardRow
              key={service.id}
              service={service}
              onDelete={() => handleDelete(service.id, service.title)}
              isDeleting={deleteMutation.isPending}
            />
          ))}
        </div>
      )}
    </>
  );
}

function ServiceCardRow({
  service,
  onDelete,
  isDeleting,
}: {
  service: CmsService;
  onDelete: () => void;
  isDeleting: boolean;
}) {
  return (
    <article className="flex flex-col justify-between bg-white p-5 shadow-[0_12px_32px_rgba(33,28,79,0.05)]">
      <div className="flex items-start gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-[4px] bg-brand/10 text-brand">
          <FlatIcon name={service.icon} className="size-6 text-brand" />
        </span>

        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-medium text-foreground hover:text-brand">
            <Link href={`/admin/services/${service.id}`}>{service.title}</Link>
          </h2>
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{service.text}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-3">
        <span className="text-xs text-muted-foreground font-mono">
          /services/{service.slug}
        </span>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="size-8 p-0 border-brand/15 text-brand shadow-none hover:border-brand hover:bg-brand hover:text-white"
            title="View on site"
          >
            <Link href={`/services/${service.slug}`} target="_blank">
              <ExternalLink className="size-3.5" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="sm"
            className="size-8 p-0 border-brand/15 text-brand shadow-none hover:border-brand hover:bg-brand hover:text-white"
            title="Edit practice area"
          >
            <Link href={`/admin/services/${service.id}`}>
              <Pencil className="size-3.5" />
            </Link>
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                disabled={isDeleting}
                className="size-8 p-0 border-gold/30 text-gold shadow-none hover:border-gold hover:bg-gold hover:text-white"
                title="Delete service"
              >
                <Trash2 className="size-3.5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Practice Area</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete <strong className="text-foreground">{service.title}</strong>? This will remove the service and its detail page from the site.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete} className="bg-destructive hover:bg-destructive/90 text-white">
                  Delete Service
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </article>
  );
}

