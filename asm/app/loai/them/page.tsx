export default async function ThemLoai() {
    return (
      <div className="border bg-white text-black text-center m-auto">
        <h1 className="text-xl font-bold mb-4 bg-pink-600 p-2">Thêm loại</h1>
        <form action="/api/loai" method="POST" className="space-y-4 px-2">
          <div className="">Tên loại 
            <input
              type="text"
              name="ten_loai"
              required
              className="border p-2 w-100"
            />
          </div>
  
          <div className="">Thứ tự 
            <input
              type="text"
              name="thu_tu"
              className="border p-2 w-100"
            />
          </div>
  
          <div className=""> Ẩn/Hiện
            <input
              type="radio"
              name="an_hien"
              value="1"
              defaultChecked
              className="ml-4"
            /> Hiện
            <input
              type="radio"
              name="an_hien"
              value="0"
              className="ml-4"
            /> Ẩn
          </div>
  
          <button
            type="submit"
            className="bg-pink-600 hover:bg-pink-900 text-white p-2 rounded mb-2"
          >
            Thêm loại
          </button>
        </form>
      </div>
    );
  }
  