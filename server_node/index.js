  const express = require("express")
  var app = express() ; //tạo ứng dụng nodejs
  const port = 3000; 
  app.use(express.json());  //cho phép đọc dữ liệu dạng json
  const cors = require("cors")
  app.use(cors()); //cho phép mọi nguồi bên ngoài request đến ứnd dụng
  const { SanPhamModel, LoaiModel, DonHangModel, DonHangChiTietModel } = require("./database"); //các model lấy database
  //routes
  app.get("/api/loai", async(req, res) =>{
      const loai_arr = await LoaiModel.findAll({ 
          where: { an_hien:1  },  
          order: [ ['thu_tu', 'ASC']],
      })
      res.json(loai_arr);
  })
  app.get("/api/loai/:id", async(req, res) =>{
      const loai = await LoaiModel.findByPk(req.params.id)
      res.json(loai);
  })






  // Route mặc định (không truyền sosp)
  app.get("/api/sphot", async (req, res) => {
      const sosp = 12;
      const sp_arr = await SanPhamModel.findAll({
        where: { an_hien: 1, hot: 1 },
        order: [['ngay', 'DESC'], ['gia', 'ASC']],
        offset: 0,
        limit: sosp,
      });
      res.json(sp_arr);
    });
    
    // Route có truyền sosp
    app.get("/api/sphot/:sosp", async (req, res) => {
      const sosp = Number(req.params.sosp);
      const sp_arr = await SanPhamModel.findAll({
        where: { an_hien: 1, hot: 1 },
        order: [['ngay', 'DESC'], ['gia', 'ASC']],
        offset: 0,
        limit: sosp,
      });
      res.json(sp_arr);
    });
    
  app.get("/api/sp/:id", async(req, res) =>{
      const id = Number(req.params.id)
      const sp = await SanPhamModel.findOne({ 
          where: { id:id  },  
      })
      res.json(sp);
  })
  app.get("/api/sptrongloai/:id", async(req, res) =>{
      const id_loai = Number(req.params.id)
      const sp_arr = await SanPhamModel.findAll({ 
          where: { id_loai: id_loai, an_hien:1  },  
          order: [ ['ngay', 'DESC'], ['gia', 'ASC'] ],
      })
      res.json(sp_arr);
  })




  // Router mới cho spmoi
  app.get("/api/spmoi/:sosp", async (req, res) => {
      const sosp = Number(req.params.sosp);
      const sp_arr = await SanPhamModel.findAll({
        where: { an_hien: 1 },
        order: [['ngay', 'DESC']],
        limit: sosp,
      });
      res.json(sp_arr);
    });
    





    app.post('/api/luudonhang/', async (req, res) => {
      let { ho_ten, email, ghi_chu } = req.body;
    
      await DonHangModel.create({
        ho_ten: ho_ten,
        email: email,
        ghi_chu: ghi_chu
      })
        .then(function (item) {
          res.json({ thong_bao: "Đã tạo đơn hàng", dh: item });
        })
        .catch(function (err) {
          res.json({ thong_bao: "Lỗi tạo đơn hàng", err });
        });
    });
    
    app.post('/api/luugiohang/', async (req, res) => {
      let { id_dh, id_sp, so_luong } = req.body
      await DonHangChiTietModel.create({
        id_dh: id_dh,
        id_sp: id_sp,
        so_luong: so_luong
      })
      .then(function(item){
        res.json({"thong_bao": "Đã lưu giỏ hàng", "sp" : item});
      })
      .catch(function (err) {
        res.json({"thong_bao":"Lỗi lưu giỏ hàng ", err })
      });
    });




    const { UserModel } = require("./database"); 
 app.post(`/api/dangnhap`, async (req, res) => {
    let {email, mat_khau} = req.body;
    const user = await UserModel.findOne( { where: { email:email  },  })
    if (user===null) return res.status(401).json({thong_bao:"Email không tồn tại"})
    let mk_mahoa = user.mat_khau;
    const bcrypt = require('bcryptjs');       
    let kq = bcrypt.compareSync(mat_khau, mk_mahoa); 
    if (kq == false) return res.json({"thong_bao":"Mật khẩu không đúng"})
    if (user.khoa) return res.json({"thong_bao":"Tài khoản bị khóa"})
    if  (user.vai_tro==0 && user.email_verified_at==null) return res.json({"thong_bao":"Tài khoản chưa kích hoạt"})
    //tạo token
    const fs = require("fs");
    let PRIVATE_KEY = fs.readFileSync("private-key.txt");
    const jwt = require("node-jsonwebtoken");
    const payload = { id:user.id, email:user.email } //nội dung token
    const maxAge = "1h";
    const bearToken = jwt.sign(payload, PRIVATE_KEY,{ expiresIn:maxAge, subject: user.id+""});
    res.status(200).json({
        token:bearToken, expiresIn:maxAge, thong_bao:"Đăng nhập thành công", 
        info: {id:user.id, ho_ten:user.ho_ten, email:user.email, vai_tro:user.vai_tro} 
    })
})





app.post(`/api/dangky`, async (req, res) => {
  let {ho_ten, email, mat_khau, go_lai_mat_khau} = req.body;
  const user = await UserModel.findOne( { where: { email:email  },  })
  if (user!=null) return res.status(401).json({thong_bao:"Email đã tồn tại"})
  if ( mat_khau==undefined || mat_khau.length<6) 
  return res.status(401).json({thong_bao:"Mật khẩu phải >=6 ký tự"})
  if ( mat_khau!=go_lai_mat_khau) 
  return res.status(401).json({thong_bao:"Hai mật khẩu không giống"})
  const bcrypt = require('bcryptjs');       
  const mk_mahoa = await bcrypt.hash(mat_khau, 10);


  const { v4: uuidv4 } = require('uuid');
  const token = uuidv4(); // 36 ký tự, VD 550e8400-e29b-41d4-a716-446655440000
  const u = await UserModel.create({ ho_ten, email, mat_khau: mk_mahoa, remember_token: token });
  
  const linkKichHoat = `http://localhost:3000/api/kichhoat?token=${token}`;
  const mailOptions = {
    from: 'tjennguyen2006@gmail.com',
    to: email,
    subject: 'Xác nhận tài khoản',
    html: `<h2>Chào ${ho_ten},</h2>
           <p>Vui lòng bấm vào link sau để kích hoạt tài khoản:</p>
           <a href="${linkKichHoat}" style="padding: 10px 20px; background: #28a745; color: #fff; text-decoration: none; border-radius: 5px;">Kích hoạt tài khoản</a>
           <p>Nếu bạn không đăng ký, vui lòng bỏ qua email này.</p>`
  };
  
  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tjennguyen2006@gmail.com', // email của bạn
      pass: 'iprm dufe mlel oexq'        // tạo mật khẩu ứng dụng và nhập vào
    }
  });
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Lỗi gửi mail:", error);
    } else {
      console.log("Email gửi thành công! ID:", info.messageId);
      console.log("Thông tin phản hồi:", info);
    }
  });
  
  res.status(200).json({ thong_bao: "Đăng ký thành công" })
})
  

app.get('/api/kichhoat', async (req, res) => {
  const { token } = req.query;
  const user = await UserModel.findOne({ where: { remember_token: token } });
  if (!user) {
    return res.status(400).json({ thong_bao: "Token không hợp lệ hoặc đã sử dụng" });
  }

  user.email_verified_at = new Date();
  user.remember_token = null;
  await user.save();

  res.json({ thong_bao: "Tài khoản đã kích hoạt!" }); // hoặc chuyển đến trang cảm ơn
});



app.post(`/api/quenpass`, async (req, res) => {
  let { email } = req.body;
  const user = await UserModel.findOne( { where: { email:email  },  })
  if (user===null) return res.status(401).json({thong_bao:"Email không tồn tại"})
  let newPass;
  do { const strRandom = Math.random().toString(36); //0.6oj656mc6ud
       newPass = strRandom.slice(-8);   //656mc6ud
  } while (newPass.length < 8);
  const bcrypt = require('bcryptjs');       
  const mk_mahoa = await bcrypt.hash(newPass, 10);
  await user.update({ mat_khau: mk_mahoa });
  //Gửi mail
  res.status(200).json({thong_bao:`Đã cập nhật mật khẩu: ${newPass}`, })
})

app.post('/api/doipass', async (req, res) => {
  let { pass_old, pass_new1, pass_new2 } = req.body;
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(403).json({ thong_bao: 'Token không hợp lệ' });
  const token = authHeader.split(' ')[1];

  const fs = require("fs");
  const private_key = fs.readFileSync("private-key.txt");
  const jwt = require("node-jsonwebtoken");

  let decoded;
  try { decoded = jwt.verify(token, private_key); }
  catch (err) {
    return res.status(403).json({ thong_bao: 'Token hết hạn hoặc ko hợp lệ' });
  }

  let id = decoded.id;
  const user = await UserModel.findByPk(id);
  let mk_trongdb = user.mat_khau;

  const bcrypt = require('bcryptjs');
  let kq = bcrypt.compareSync(pass_old, mk_trongdb);
  if (kq == false) return res.status(403).json({ thong_bao: "Mật khẩu cũ không đúng" });

  if (pass_new1 == "" || pass_new1 != pass_new2)
    return res.json({ thong_bao: "2 Mật khẩu mới không khớp" });

  const salt = bcrypt.genSaltSync(10);
  let mk_mahoa = bcrypt.hashSync(pass_new1, salt); // mã hóa mật khẩu
  await UserModel.update({ mat_khau: mk_mahoa }, { where: { id: id } });

  res.status(200).json({ thong_bao: "Đã cập nhật" });
});




  app.listen(port, () =>{
      console.log(`Ung dung dang chay o port ${port}`);
  })
  .on('error', function(err) { 
      console.log(`Loi xay ra khi chay ung dung ${err}`)
  });
