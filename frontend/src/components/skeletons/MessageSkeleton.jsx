// Mesaj iskelet bileşeni
const MessageSkeleton = () => {
	return (
		<>
			{/* Mesaj gövdesi */}
			<div className='flex gap-3 items-center'>
				{/* Profil resmi iskeleti */}
				<div className='skeleton w-10 h-10 rounded-full shrink-0'></div>
				{/* Mesaj metni iskeleti */}
				<div className='flex flex-col gap-1'>
					<div className='skeleton h-4 w-40'></div>
					<div className='skeleton h-4 w-40'></div>
				</div>
			</div>
			{/* Mesaj altıbilgisi */}
			<div className='flex gap-3 items-center justify-end'>
				{/* Mesaj altıbilgisi metni iskeleti */}
				<div className='flex flex-col gap-1'>
					<div className='skeleton h-4 w-40'></div>
				</div>
				{/* Mesaj altıbilgisi profil resmi iskeleti */}
				<div className='skeleton w-10 h-10 rounded-full shrink-0'></div>
			</div>
		</>
	);
};
export default MessageSkeleton; // Mesaj iskelet bileşenini dışa aktarır
