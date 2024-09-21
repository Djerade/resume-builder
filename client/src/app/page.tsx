"use client";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [fullName, setfullName] = useState("");
  const [currentTechnologie, setcurrentTechnologie] = useState("");
  const [Loading, setLoading] = useState(false);
  const [image, setimage] = useState<File>();

  function handleFormSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    const formData = new FormData();

    formData.append("image", fullName);
    formData.append("fullname", fullName);
    formData.append("currentTechnologie", currentTechnologie);

    console.log({
      fullName,
      image,
      currentTechnologie,
      Loading
    });

    axios
      .post("", formData, {})
      .then((res) => {
        if (res.data.message) {
          console.log(res.data.message);
        }
      })
      .catch((err) => console.error(err.message));
    setLoading(true);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <p className="font-bold size-1">Creat resume</p>
        <form
          className=" flex-col"
          encType="multipart/form-data"
          onSubmit={handleFormSubmit}
          method="post"
        >
          <div className="flex-col w-full m-2">
            <label htmlFor="fullName"> Enter your full Name</label>
            <input
              type="text"
              name="fullName"
              required
              id="fullName"
              value={fullName}
              onChange={(e) => setfullName(e.target.value)}
            />
          </div>
          <div className="flex-col w-full m-2">
            <label htmlFor="currentTechnologie"> technologie</label>
            <input
              type="text"
              name="currentTechnologie"
              required
              id="currentTechnologie"
              value={currentTechnologie}
              onChange={(e) => setcurrentTechnologie(e.target.value)}
            />
          </div>
          <div className="flex-col w-full m-2">
            <label htmlFor="photo"> Upload</label>
            <input
              type="file"
              name="image"
              required
              id="image"
              accept="image/x-png, image/jpeg"
              onChange={(e) => e.target.files && setimage(e.target.files[0])}
            />
          </div>
          <button type="submit">Create resume</button>
        </form>
      </main>
    </div>
  );
}
