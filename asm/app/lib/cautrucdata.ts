export interface ILoai {
    id:number;
    ten_loai:string;
    slug:string;
    thu_tu:Number;
    an_hien:boolean;
}
export interface ISanPham {
    id: number;
    ten_sp: string;
    slug: string;
    gia: number;
    gia_km: number;
    ngay: string;
    hinh: string;
    id_loai: number;
    luot_xem: number;
    hot: boolean;
    an_hien: boolean;
    tinh_chat: string;
  }