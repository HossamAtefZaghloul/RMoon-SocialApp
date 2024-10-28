// {isLoading && (
//     <div className="flex items-center justify-center text-red-500">
//       <Loader className="animate-spin h-5 w-5" />
//       <span className="">Loading...</span>
//     </div>
//   )}
//   {error && (
//     <div
//       className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
//       role="alert"
//     >
//       <span className="block sm:inline">{error}</span>
//     </div>
//   )}

//   {!isLoading && !error && users.length > 0 && (
//     <ul className="space-y-2">
//       {users.map((user) => (
//         <li
//           key={user.id}
//           className="bg-[#18191A] shadow rounded-lg p-4 flex items-center  space-x-4 z-50 border border-gray-700"
//         >
//           <User className="h-6 w-6 text-red-800" />
//           <div>
//             <p className="font-medium text-white">{user.name}</p>
//             <p className="text-sm text-gray-500">{user.email}</p>
//           </div>
//           <div className=" flex justify-end w-full text-red-800 ">
//             <button>
//               <UserPlus />
//             </button>
//           </div>
//         </li>
//       ))}
//     </ul>
//   )}

//   {!isLoading && !error && query && users.length === 0 && (
//     <div className="text-center text-red-800 bg-[#242526] rounded-lg p-5 border border-gray-700">
//       No users found
//     </div>
//   )}
