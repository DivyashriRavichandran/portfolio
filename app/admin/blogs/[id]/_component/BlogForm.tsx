"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Gapcursor from "@tiptap/extension-gapcursor"; // Imported Gapcursor to resolve cell selection states
import { format } from "date-fns";
import {
  Loader2,
  ImagePlus,
  Sparkles,
  Terminal,
  Code2,
  BookOpen,
  Bold,
  Italic,
  Heading2,
  Heading3,
  Table as TableIcon,
  List,
  ListOrdered,
  Calendar as CalendarIcon,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import H3Component from "@/components/headings/H3";
import { Doc } from "@/convex/_generated/dataModel";
import { Table } from "@tiptap/extension-table";

interface BlogFormValues {
  slug: string;
  title_en: string;
  title_nl: string;
  description_en: string;
  description_nl: string;
  content_en: string;
  content_nl: string;
  tags: string;
  image: string;
  timeToRead: number;
  publishedAt: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EditorToolbar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  // Checks if the cursor is anywhere inside a table structure
  const isTableActive = editor.isActive("table");

  return (
    <div className="flex flex-wrap gap-2 p-2 bg-white/5 border-b border-white/10 rounded-t-xl items-center">
      <Button
        type="button"
        size="sm"
        variant={editor.isActive("bold") ? "default" : "ghost"}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant={editor.isActive("italic") ? "default" : "ghost"}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant={editor.isActive("heading", { level: 2 }) ? "default" : "ghost"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant={editor.isActive("heading", { level: 3 }) ? "default" : "ghost"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        size="sm"
        variant={editor.isActive("bulletList") ? "default" : "ghost"}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant={editor.isActive("orderedList") ? "default" : "ghost"}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>

      <div className="h-4 w-px bg-white/10 mx-1" />

      {/* Insert Table Button */}
      {!isTableActive && (
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        >
          <TableIcon className="h-4 w-4 mr-1" />
          <span className="text-xs">Table</span>
        </Button>
      )}

      {/*  Table Editing Controls  */}
      {isTableActive && (
        <div className="flex flex-wrap gap-1.5 bg-black/30 p-1 rounded-md border border-white/5 data-[state=open]:animate-in data-[state=closed]:animate-out fade-in duration-200">
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="text-xs px-2 h-7"
            onMouseDown={(e) => e.preventDefault()} // 💡 Prevents focus loss
            onClick={() => editor.chain().focus().addColumnAfter().run()}
          >
            <Plus className="h-3 w-3 mr-1 text-emerald-400" /> +Col
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="text-xs px-2 h-7"
            onMouseDown={(e) => e.preventDefault()} // 💡 Prevents focus loss
            onClick={() => editor.chain().focus().addRowAfter().run()}
          >
            <Plus className="h-3 w-3 mr-1 text-emerald-400" /> +Row
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="text-xs px-2 h-7 text-rose-400 hover:text-rose-300"
            onMouseDown={(e) => e.preventDefault()} // 💡 Prevents focus loss
            onClick={() => editor.chain().focus().deleteColumn().run()}
          >
            <Trash2 className="h-3 w-3 mr-1" /> -Col
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="text-xs px-2 h-7 text-rose-400 hover:text-rose-300"
            onMouseDown={(e) => e.preventDefault()} // 💡 Prevents focus loss
            onClick={() => editor.chain().focus().deleteRow().run()}
          >
            <Trash2 className="h-3 w-3 mr-1" /> -Row
          </Button>
          <Button
            type="button"
            size="sm"
            variant="destructive"
            className="text-xs px-2 h-7 bg-red-950 text-red-200 hover:bg-red-900 border border-red-800"
            onMouseDown={(e) => e.preventDefault()} // 💡 Prevents focus loss
            onClick={() => editor.chain().focus().deleteTable().run()}
          >
            <Trash2 className="h-3 w-3 mr-1" /> Delete Table
          </Button>
        </div>
      )}
    </div>
  );
};

export default function BlogForm({
  initialData,
}: {
  initialData?: Doc<"blogs">;
}) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const createBlog = useMutation(api.blogs.create);
  const updateBlog = useMutation(api.blogs.update);
  const generateUploadUrl = useMutation(api.images.generateUploadUrl);

  const { register, handleSubmit, setValue, watch, control } =
    useForm<BlogFormValues>({
      defaultValues: initialData
        ? {
            slug: initialData.slug,
            title_en: initialData.title.en,
            title_nl: initialData.title.nl,
            description_en: initialData.description.en,
            description_nl: initialData.description.nl,
            content_en: initialData.content.en,
            content_nl: initialData.content.nl,
            tags: initialData.tags?.join(", ") || "",
            image: initialData.coverImage || "",
            timeToRead: initialData.timeToRead || 5,
            publishedAt: initialData.publishedAt
              ? new Date(initialData.publishedAt).toISOString()
              : new Date().toISOString(),
          }
        : {
            slug: "",
            title_en: "",
            title_nl: "",
            description_en: "",
            description_nl: "",
            content_en: "",
            content_nl: "",
            tags: "",
            image: "",
            timeToRead: 5,
            publishedAt: new Date().toISOString(),
          },
    });

  const editorExtensions = [
    StarterKit,
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
    Gapcursor,
  ];

  // Global styles
  const editorClassStyles =
    "prose prose-invert max-w-none min-h-[200px] focus:outline-none p-4 text-sm bg-black/20 rounded-b-xl border border-white/10 border-t-0 " +
    "[&_table]:border-collapse [&_table]:w-full [&_table]:my-4 " +
    "[&_th]:border [&_th]:border-white/20 [&_th]:p-2 [&_th]:bg-white/5 [&_th]:text-left [&_th]:font-semibold " +
    "[&_td]:border [&_td]:border-white/10 [&_td]:p-2";

  const editorEn = useEditor({
    extensions: editorExtensions,
    content: initialData?.content.en || "",
    onUpdate: ({ editor }) => {
      setValue("content_en", editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: editorClassStyles,
      },
    },
  });

  const editorNl = useEditor({
    extensions: editorExtensions,
    content: initialData?.content.nl || "",
    onUpdate: ({ editor }) => {
      setValue("content_nl", editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: editorClassStyles,
      },
    },
  });

  useEffect(() => {
    if (initialData) {
      register("content_en");
      register("content_nl");
    }
  }, [register, initialData]);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const watchTitleEn = watch("title_en");

  const onSubmit = async (data: BlogFormValues) => {
    const tagsArray = data.tags
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const finalSlug = data.slug.trim() || generateSlug(data.title_en);

    if (!finalSlug) {
      toast.error("A unique slug or title is required.");
      return;
    }

    const payload = {
      slug: finalSlug,
      title: { en: data.title_en, nl: data.title_nl },
      description: { en: data.description_en, nl: data.description_nl },
      content: { en: data.content_en, nl: data.content_nl },
      tags: tagsArray.length > 0 ? tagsArray : undefined,
      coverImage: data.image || undefined,
      timeToRead: Number(data.timeToRead) || undefined,
      publishedAt: data.publishedAt
        ? new Date(data.publishedAt).getTime()
        : Date.now(),
    };

    try {
      if (initialData?._id) {
        await updateBlog({ id: initialData._id, ...payload });
      } else {
        await createBlog(payload);
      }
      toast.success("Blog article saved successfully!");
      router.push("/admin");
    } catch (e) {
      console.error(e);
      toast.error("Failed to save the blog entry.");
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await generateUploadUrl();
      const res = await fetch(url, { method: "POST", body: file });
      const { storageId } = await res.json();
      setValue("image", storageId);
      toast.success("Cover image uploaded");
    } catch (err) {
      toast.error("Upload failed" + err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-10 pb-24 max-w-4xl"
    >
      {/* Content Identifiers */}
      <section className="space-y-6">
        <H3Component icon={Terminal} text="Blog Metadata" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/5 p-6 rounded-xl border border-white/10">
          <Input
            {...register("title_en", { required: true })}
            placeholder="Blog Title (EN) *"
            variant="admin"
          />
          <Input
            {...register("title_nl", { required: true })}
            placeholder="Blog Titel (NL) *"
            variant="admin"
          />
          <div className="md:col-span-2">
            <Input
              {...register("slug")}
              placeholder={
                watchTitleEn
                  ? `Slug (e.g., ${generateSlug(watchTitleEn)})`
                  : "Custom URL Slug (Optional)"
              }
              variant="admin"
            />
          </div>
        </div>
      </section>

      {/* Excerpts / Descriptions */}
      <section className="space-y-6">
        <H3Component icon={Code2} text="Summaries & Tags" />
        <div className="space-y-4 bg-white/5 p-6 rounded-xl border border-white/10">
          <Textarea
            {...register("description_en")}
            placeholder="Short Summary / Excerpt (EN)"
            variant="admin"
            rows={2}
          />
          <Textarea
            {...register("description_nl")}
            placeholder="Korte Samenvatting (NL)"
            variant="admin"
            rows={2}
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-2">
              <Input
                {...register("tags")}
                placeholder="Tags (comma separated: WebDev, React, Nextjs)"
                variant="admin"
              />
            </div>
            <div>
              <Input
                type="number"
                {...register("timeToRead", { valueAsNumber: true })}
                placeholder="Read time (mins)"
                variant="admin"
              />
            </div>

            {/* Calendar Controller Field */}
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-semibold text-white/40 uppercase tracking-wider">
                Publish Date
              </label>
              <Controller
                control={control}
                name="publishedAt"
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="flex items-center justify-between w-full h-11 bg-black/20 border border-white/10 rounded-md px-4 text-sm text-white/80 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/80"
                      >
                        <span className="flex items-center">
                          <CalendarIcon className="mr-2 h-4 w-4 opacity-60" />
                          {field.value ? (
                            format(new Date(field.value), "PPP")
                          ) : (
                            <span>Publish Date</span>
                          )}
                        </span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 bg-zinc-900 border border-white/10"
                      align="end"
                    >
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => field.onChange(date?.toISOString())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Deep Body Articles */}
      <section className="space-y-6">
        <H3Component icon={BookOpen} text="Rich Text Content" />
        <div className="space-y-6 bg-white/5 p-6 rounded-xl border border-white/10">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-white/50">
              English Content
            </label>
            <div className="flex flex-col">
              <EditorToolbar editor={editorEn} />
              <EditorContent editor={editorEn} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-white/50">
              Nederlandse Content
            </label>
            <div className="flex flex-col">
              <EditorToolbar editor={editorNl} />
              <EditorContent editor={editorNl} />
            </div>
          </div>
        </div>
      </section>

      {/* Simple Cover Image Canvas */}
      <section className="space-y-6">
        <H3Component icon={Sparkles} text="Visual Presentation" />
        <label className="group relative aspect-video w-64 border-2 border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-all overflow-hidden">
          {watch("image") ? (
            <div className="text-center">
              <Sparkles className="mx-auto mb-2 text-primary" />
              <span className="text-[10px] uppercase font-bold text-primary">
                Image Uploaded
              </span>
            </div>
          ) : (
            <>
              <ImagePlus className="opacity-20 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] uppercase font-bold text-white/40">
                Upload Cover Image
              </span>
            </>
          )}
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleUpload}
          />
        </label>
      </section>

      <Button disabled={uploading} className="w-full h-14 text-lg font-bold">
        {uploading ? (
          <Loader2 className="animate-spin" />
        ) : initialData ? (
          "Update Post Entry"
        ) : (
          "Publish Post Entry"
        )}
      </Button>
    </form>
  );
}
