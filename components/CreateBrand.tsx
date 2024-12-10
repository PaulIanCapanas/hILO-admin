// "use client";

// import React, { useState } from "react";
// import uploadDocument from "@/helpers/firebase/uploadDocument";
// import { Collection } from "@/enums/collection";

// interface CreateBrandProps {
//   setRecentlyCreatedBrands: React.Dispatch<React.SetStateAction<boolean>>;
// }

// export default function CreateBrand(props: CreateBrandProps) {
//   const { setRecentlyCreatedBrands } = props;
//   const [name, setName] = useState<string>("");

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       await uploadDocument(Collection.BRANDS, {
//         name: name,
//       });
//       console.log("Successfully uploaded brand");

//       setRecentlyCreatedBrands(true);
//       setName("");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     // <form
//     //   className="w-1/2 px-10 py-12 border border-black shadow-md"
//     //   onSubmit={handleSubmit}
//     // >
//     //   <div className="space-y-2 pb-6">
//     //     <p className="text-lg text-black">Brand Name:</p>
//     //     <input
//     //       className="h-10 w-2/4 border border-black rounded-md px-3 text-black"
//     //       placeholder="Apple"
//     //       value={name}
//     //       onChange={(e) => setName(e.target.value)}
//     //     />
//     //   </div>
//     //   <button className="h-10 w-24 bg-blue-500 rounded-md text-white">
//     //     Submit
//     //   </button>
//     // </form>

//        <div className="min-h-screen flex flex-col items-center justify-center">
//       <form
//         className="w-full max-w-md px-10 py-12 bg-primary border border-black shadow-md rounded-md"
//         onSubmit={handleSubmit}
//       >
//         <div className="space-y-2 pb-6">
//           <p className="text-lg text-black">Brand Name:</p>
//           <input
//             className="h-10 w-full border border-black rounded-md px-3 text-black"
//             placeholder="Apple"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <button className="h-10 w-full bg-purple-500 rounded-md text-white">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }


"use client";

import React, { useState } from "react";
import uploadDocument from "@/helpers/firebase/uploadDocument";
import { Collection } from "@/enums/collection";

interface CreateBrandProps {
  setRecentlyCreatedBrands: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateBrand(props: CreateBrandProps) {
  const { setRecentlyCreatedBrands } = props;
  const [name, setName] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await uploadDocument(Collection.BRANDS, {
        name: name,
      });
      console.log("Successfully uploaded brand");

      setRecentlyCreatedBrands(true);
      setName("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form
        className="w-full max-w-md px-10 py-12 bg-primary border border-black shadow-md rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="space-y-2 pb-6">
          <p className="text-lg text-black">Brand Name:</p>
          <input
            className="h-10 w-full border border-black rounded-md px-3 text-black"
            placeholder="Apple"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button className="h-10 w-full bg-purple-500 rounded-md text-white">
          Submit
        </button>
      </form>
    </div>
  );
}