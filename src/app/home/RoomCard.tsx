import Image from "next/image";

export default function RoomCard({ setDisplayAuthor, setContactDisplay, imageUrl, title, description, rent, addr1, addr2, author }: any) {
  return (
    <div className="card card-bordered shadow-2xl w-80 h-fit">
      <div>
        <Image src={imageUrl} width={800} height={450} alt={title} priority />
      </div>
      <div className="p-5">
        <div>
          <h2 className="text-2xl mb-2">{title}</h2>
        </div>
        <div className="mb-2 text-sm">
          <p>{description}</p>
        </div>
        <div className="mb-2">
          <label className="text-sm text-gray-400">Address</label>
          <address className="text-sm">
            {addr1}<br />
            {addr2}
          </address>
        </div>
        <div className="mb-2">
          <label className="text-sm text-gray-400">Owner</label>
          <p className="text-sm">{author.name}</p>
        </div>
        <div className="flex gap-2 items-center">
          <button onClick={() => {
            setDisplayAuthor({
              name: author.name,
              email: author.email,
              phone: author.phone
            })
            setContactDisplay(true)
          }} className="btn btn-accent btn-sm">Book now</button>
          <div className="badge badge-outline badge-md text-xs">Rent: {rent}/-</div>
        </div>
      </div>

    </div>
  )
}
