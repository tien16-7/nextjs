// lib/models.ts
import { DataTypes } from "sequelize";
import { db } from "./database";

export const LoaiModel = db.define("loai", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  ten_loai: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, defaultValue: "" },
  thu_tu: { type: DataTypes.INTEGER, defaultValue: 0 },
  an_hien: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
  tableName: "loai",
  timestamps: false, // Không sử dụng createdAt, updatedAt
});

export async function syncDatabase() {
  await db.sync();
}
export const SanPhamModel = db.define("san_pham", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  ten_sp: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    defaultValue: ""
  },
  gia: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  gia_km: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  hinh: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ngay: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  id_loai: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  an_hien: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  hot: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
}, {
  tableName: "san_pham",
  timestamps: false, // Không sử dụng createdAt, updatedAt
});