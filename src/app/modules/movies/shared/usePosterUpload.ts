import { useState } from "react";
import { AlertService } from "../../../shared/alert";

const validTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
const defaultPoster =
  "https://res.cloudinary.com/doypmjt76/image/upload/v1748286735/image-default_lkeqa2.png";

export function usePosterUpload() {
  const [posterPreview, setPosterPreview] = useState<string>(defaultPoster);
  const [posterFile, setPosterFile] = useState<File | null>(null);

  const handlePosterChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (!validTypes.includes(file.type)) {
        setPosterPreview(defaultPoster);
        e.target.value = "";
        setPosterFile(null);

        await AlertService.showError(
          [
            {
              error:
                "Por favor, selecciona un archivo de imagen (JPG, PNG, GIF).",
            },
          ],
          "Archivo no válido"
        );

        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setPosterPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
      setPosterFile(file);
    } else {
      setPosterPreview(defaultPoster);
      setPosterFile(null);
    }
  };

  return {
    posterPreview,
    posterFile,
    setPosterPreview,
    setPosterFile,
    handlePosterChange,
    defaultPoster,
  };
}
