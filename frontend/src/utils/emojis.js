export const funEmojis = [
	"💼", // Briefcase
	"📚", // Books
	"📖", // Open Book
	"🖋️", // Fountain Pen
	"✏️", // Pencil
	"📝", // Memo
	"🗒️", // Spiral Notebook
	"📅", // Calendar
	"📆", // Tear-Off Calendar
	"📈", // Chart Increasing
	"📉", // Chart Decreasing
	"📊", // Bar Chart
	"💻", // Laptop
	"🖥️", // Desktop Computer
	"🖨️", // Printer
	"📞", // Telephone Receiver
	"📠", // Fax Machine
	"📺", // Television
	"🎥", // Movie Camera
	"🎬", // Clapper Board
	"🏢", // Office Building
	"🏫", // School
	"🏋️", // Weight Lifter
	"🏅", // Sports Medal
	"🎖️", // Military Medal
	"🏆", // Trophy
	"⚽", // Soccer Ball
	"🏀", // Basketball
	"🏈", // American Football
	"⚾", // Baseball
	"🎾", // Tennis
	"🏐", // Volleyball
	"🏉", // Rugby Football
	"🎱", // Pool 8 Ball
	"🏓", // Ping Pong
	"🏸", // Badminton
	"🥅", // Goal Net
	"🏒", // Ice Hockey
	"🏑", // Field Hockey
	"🏏", // Cricket Game
	"⛳", // Flag in Hole
	"🏹", // Bow and Arrow
	"🎣", // Fishing Pole
	"🥊", // Boxing Glove
	"🥋", // Martial Arts Uniform
	"⛸️", // Ice Skate
	"🎿", // Skis
	"⛷️", // Skier
	"🏂", // Snowboarder
	"🚴", // Bicyclist
	"🚵", // Mountain Bicyclist
	"🏇", // Horse Racing
	"🧘", // Person in Lotus Position
	"🏊", // Swimmer
	"🤽", // Water Polo
	"🤾", // Handball
	"🤹", // Juggling
	"🎓", // Graduation Cap
	"🏛️", // Classical Building
	"🏫", // School
	"🏢", // Office Building
	"🏬", // Department Store
];

export const getRandomEmoji = () => {
	return funEmojis[Math.floor(Math.random() * funEmojis.length)];
};
