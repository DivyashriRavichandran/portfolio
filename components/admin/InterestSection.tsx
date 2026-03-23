import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ImagePlus, Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";

interface Interest {
  title: string;
  description: string;
  image: string;
}

interface FormData {
  interests?: Interest[];
  // Include other fields if you use them inside this component,
  // or use Record<string, any> if it's a large object
  [key: string]: any;
}

interface InterestSectionProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<any>>; // Or your specific State type
}

// Helper Component to display Convex Images
const InterestImage = ({ storageId }: { storageId: string }) => {
  const imageUrl = useQuery(api.about.getUrl, { storageId });
  if (!imageUrl)
    return <div className="w-full h-full bg-muted animate-pulse" />;
  return (
    <img src={imageUrl} className="w-full h-full object-cover" alt="Interest" />
  );
};

export const InterestSection = ({
  formData,
  setFormData,
}: InterestSectionProps) => {
  const generateUploadUrl = useMutation(api.about.generateUploadUrl);
  const [isUploading, setIsUploading] = useState<number | null>(null);

  const handleUpload = async (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(index);

    // 1. Get a short-lived upload URL from Convex
    const postUrl = await generateUploadUrl();

    // 2. POST the file to that URL
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    });

    const { storageId } = await result.json();

    // 3. Save the storageId into your form state
    const updated = [...(formData.interests ?? [])];
    updated[index].image = storageId;
    setFormData({ ...formData, interests: updated });
    setIsUploading(null);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {formData.interests?.map((interest, index) => (
        <div
          key={index}
          className="group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden"
        >
          {/* IMAGE UPLOAD BOX */}
          <div
            className="relative h-48 w-full bg-muted cursor-pointer group"
            onClick={() => document.getElementById(`file-${index}`)?.click()}
          >
            {interest.image ? (
              <InterestImage storageId={interest.image} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                {isUploading === index ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <ImagePlus />
                )}
                <span className="text-xs mt-2">Upload Image</span>
              </div>
            )}

            <input
              id={`file-${index}`}
              type="file"
              className="hidden"
              onChange={(e) => handleUpload(index, e)}
            />
          </div>

          {/* INPUTS */}
          <div className="p-4 space-y-3">
            <Input
              value={interest.title}
              placeholder="Title"
              onChange={(e) => {
                const updated = [...formData.interests];
                updated[index].title = e.target.value;
                setFormData({ ...formData, interests: updated });
              }}
            />
            <textarea
              className="w-full p-2 text-sm bg-transparent border rounded-lg"
              value={interest.description}
              placeholder="Description"
              onChange={(e) => {
                const updated = [...formData.interests];
                updated[index].description = e.target.value;
                setFormData({ ...formData, interests: updated });
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
