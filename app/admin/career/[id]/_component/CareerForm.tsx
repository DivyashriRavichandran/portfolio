"use client";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Loader2,
  GraduationCap,
  Briefcase,
  ImagePlus,
  X,
  CalendarIcon,
  Trash2,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import H3 from "@/components/headings/H3";
import { Doc } from "@/convex/_generated/dataModel";
import { useState } from "react";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

interface ListItem {
  value: string;
}

interface CareerFormValues {
  type: "education" | "experience";
  logo: string;
  title_en: string;
  title_nl: string;
  organization_en: string;
  organization_nl: string;
  location_en: string;
  location_nl: string;
  startDate: string;
  endDate: string;
  achievements_en: ListItem[];
  achievements_nl: ListItem[];
  tags: ListItem[];
  grade: string;
  category: string;
  url: string;
  websites: ListItem[];
}

export default function CareerForm({
  initialData,
}: {
  initialData?: Doc<"career">;
}) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);

  const createCareer = useMutation(api.career.create);
  const updateCareer = useMutation(api.career.update);
  const generateUploadUrl = useMutation(api.images.generateUploadUrl);

  const { register, handleSubmit, setValue, watch, control } =
    useForm<CareerFormValues>({
      defaultValues: initialData
        ? {
            type: initialData.type,
            logo: initialData?.logo || "",
            title_en: initialData.title.en,
            title_nl: initialData.title.nl,
            organization_en: initialData.organization.en,
            organization_nl: initialData.organization.nl,
            location_en: initialData.location?.en || "",
            location_nl: initialData.location?.nl || "",
            startDate: initialData.startDate,
            endDate: initialData.endDate || "",
            achievements_en:
              initialData.achievements?.en.map((v) => ({ value: v })) || [],
            achievements_nl:
              initialData.achievements?.nl.map((v) => ({ value: v })) || [],
            tags: initialData.tags?.map((v) => ({ value: v })) || [],
            websites: initialData.websites?.map((v) => ({ value: v })) || [],
            grade: initialData.grade || "",
            category: initialData.category || "",
            url: initialData.url || "",
          }
        : {
            type: "experience",
            title_en: "",
            title_nl: "",
            logo: "",
            organization_en: "",
            organization_nl: "",
            location_en: "",
            location_nl: "",
            startDate: "",
            endDate: "",
            grade: "",
            category: "",
            url: "",
            achievements_en: [{ value: "" }],
            achievements_nl: [{ value: "" }],
            tags: [{ value: "" }],
            websites: [{ value: "" }],
          },
    });

  // FIELD ARRAYS
  const achEn = useFieldArray({ control, name: "achievements_en" });
  const achNl = useFieldArray({ control, name: "achievements_nl" });
  const tagArray = useFieldArray({ control, name: "tags" });
  const webArray = useFieldArray({ control, name: "websites" });

  const onSubmit = async (data: CareerFormValues) => {
    const payload = {
      type: data.type,
      logo: data.logo,
      title: { en: data.title_en, nl: data.title_nl },
      organization: {
        en: data.organization_en,
        nl: data.organization_nl,
      },
      location: {
        en: data.location_en,
        nl: data.location_nl,
      },

      startDate: data.startDate,
      endDate: data.endDate || undefined,

      achievements: {
        en: data.achievements_en.map((a) => a.value).filter(Boolean),
        nl: data.achievements_nl.map((a) => a.value).filter(Boolean),
      },
      tags: data.tags.map((t) => t.value).filter(Boolean),
      websites: data.websites.map((w) => w.value).filter(Boolean),
      grade: data.grade || undefined,
      category: data.category || undefined,
      url: data.url || undefined,
    };

    try {
      if (initialData?._id) {
        await updateCareer({
          id: initialData._id,
          ...payload,
        });
      } else {
        await createCareer(payload);
      }

      toast.success("Career entry saved");
      router.push("/admin");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save entry");
    }
  };

  const logoId = watch("logo");

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const postUrl = await generateUploadUrl();

      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      const { storageId } = await result.json();

      setValue("logo", storageId);

      toast.success("Logo uploaded");
    } catch (err) {
      toast.error("Upload failed");
      console.log(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-16 pb-24">
      {/* SECTION 1 */}
      <section className="space-y-6">
        <H3 icon={Briefcase} text="Basic Information" />

        <div className="grid grid-cols-2 gap-8 bg-foreground/5 border border-white/5 p-8 rounded-lg">
          <div className="space-y-4">
            <CustomLabel label="Title (EN / NL)" />
            <Input
              {...register("title_en")}
              placeholder="Title EN"
              variant="admin"
            />
            <Input
              {...register("title_nl")}
              placeholder="Title NL"
              variant="admin"
            />
          </div>

          <div className="space-y-4">
            <CustomLabel label="Type" />
            <Input
              {...register("type")}
              placeholder="education / experience"
              variant="admin"
            />
          </div>

          <div className="space-y-4">
            <CustomLabel label="Organization" />
            <Input
              {...register("organization_en")}
              placeholder="Org EN"
              variant="admin"
            />
            <Input
              {...register("organization_nl")}
              placeholder="Org NL"
              variant="admin"
            />
          </div>

          <div className="space-y-4">
            <CustomLabel label="Location" />
            <Input
              {...register("location_en")}
              placeholder="Location EN"
              variant="admin"
            />
            <Input
              {...register("location_nl")}
              placeholder="Location NL"
              variant="admin"
            />
          </div>

          <div className="space-y-4 md:col-span-2">
            <CustomLabel label="Dates" />
            <div className="grid md:grid-cols-2 gap-8">
              {/* Start Date */}
              <Controller
                control={control}
                name="startDate"
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="flex items-center h-11 bg-white/10 border border-white/10 rounded-md px-4 text-sm placeholder:opacity-60 focus-visible:ring-1 focus-visible:ring-primary/80">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span>Start Date</span>
                        )}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
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

              {/* End Date */}
              <Controller
                control={control}
                name="endDate"
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="flex items-center h-11 bg-white/10 border border-white/10 rounded-md px-4 text-sm placeholder:opacity-60 focus-visible:ring-1 focus-visible:ring-primary/80">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span>End Date (Present)</span>
                        )}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => field.onChange(date?.toISOString())}
                        initialFocus
                      />
                      <Button
                        variant="ghost"
                        className="w-full text-xs"
                        onClick={() => field.onChange("")}
                      >
                        Clear (Present)
                      </Button>
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="space-y-6">
        <H3 icon={GraduationCap} text="Contributions" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-foreground/5 border border-white/5 p-8 rounded-lg">
          {/* EN ACHIEVEMENTS */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <CustomLabel label="Achievements (EN)" />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => achEn.append({ value: "" })}
              >
                <Plus size={14} className="mr-1" /> Add
              </Button>
            </div>
            {achEn.fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <Input
                  {...register(`achievements_en.${index}.value`)}
                  placeholder="Achieved..."
                  variant="admin"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => achEn.remove(index)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            ))}
          </div>

          {/* NL ACHIEVEMENTS */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <CustomLabel label="Achievements (NL)" />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => achNl.append({ value: "" })}
              >
                <Plus size={14} className="mr-1" /> Add
              </Button>
            </div>
            {achNl.fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <Input
                  {...register(`achievements_nl.${index}.value`)}
                  placeholder="Prestatie..."
                  variant="admin"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => achNl.remove(index)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: WEBSITES & TAGS */}
      <section className="space-y-6">
        <H3 icon={ImagePlus} text="Links & Stack" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-foreground/5 border border-white/5 p-8 rounded-lg">
          {/* DYNAMIC WEBSITES */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <CustomLabel label="Live Websites" />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => webArray.append({ value: "" })}
              >
                <Plus size={14} className="mr-1" /> Add
              </Button>
            </div>
            {webArray.fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <Input
                  {...register(`websites.${index}.value`)}
                  placeholder="https://..."
                  variant="admin"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => webArray.remove(index)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            ))}
          </div>

          {/* DYNAMIC TAGS */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <CustomLabel label="Tech Stack / Tags" />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => tagArray.append({ value: "" })}
              >
                <Plus size={14} className="mr-1" /> Add
              </Button>
            </div>
            {tagArray.fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <Input
                  {...register(`tags.${index}.value`)}
                  placeholder="React"
                  variant="admin"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => tagArray.remove(index)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOGO & SUBMIT */}
      <div className="space-y-4">
        <CustomLabel label="Logo" />

        {logoId ? (
          <div className="relative size-24 rounded-md border border-white/10 overflow-hidden group bg-foreground/10">
            {/* <Image src={logoId} alt="" /> */}
            <button
              type="button"
              onClick={() => setValue("logo", "")}
              className="absolute inset-0 flex items-center justify-center bg-red-500/80 opacity-0 group-hover:opacity-100 transition"
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <label className="size-24 border-2 border-dashed border-white/10 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition group">
            <ImagePlus
              size={20}
              className="opacity-30 group-hover:opacity-60"
            />
            <span className="text-[10px] mt-1 opacity-50 uppercase">
              Upload
            </span>

            <input type="file" className="hidden" onChange={handleLogoUpload} />
          </label>
        )}
      </div>

      {/* SUBMIT */}
      <div className="pt-10 border-t border-white/5">
        <Button className="w-full font-bold">
          <Loader2 className="mr-2 hidden animate-spin" />
          Save Career Entry
        </Button>
      </div>
    </form>
  );
}

function CustomLabel({ label }: { label: string }) {
  return (
    <p className="text-xs uppercase font-semibold tracking-widest text-primary mb-2">
      {label}
    </p>
  );
}
