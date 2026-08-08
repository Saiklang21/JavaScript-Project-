# PICA Studio — เว็บไซต์กลุ่ม

เว็บไซต์แบบ static HTML/CSS/JS หลายหน้า ทำโดยทีม 3 คน จำลองเว็บสตูดิโอออกแบบ "PICA Studio" พร้อมหน้าโปรไฟล์ทีมและ portfolio ส่วนตัวของแต่ละคน

## โครงสร้างโปรเจกต์

```
home/         หน้าแรกของเว็บไซต์ (home.html, home.css)
profile/      หน้ารวมทีม แสดงการ์ดสมาชิกทั้ง 3 คน ลิงก์ไปยัง portfolio ของแต่ละคน
chat/         หน้าแชทจำลอง (ตัวอย่าง UI คุยงานกับแอดมิน)
portfolio-1/  Portfolio ของสมาชิกคนที่ 1 — Project Manager / Product Owner
portfolio-2/  Portfolio ของสมาชิกคนที่ 2 — System Analyst / UX Designer
portfolio-3/  Portfolio ของสมาชิกคนที่ 3 — Front-end Developer
```

แต่ละคนทำงานเฉพาะในโฟลเดอร์ `portfolio-<เลขของตัวเอง>/` ของตัวเองเท่านั้น เพื่อไม่ให้ไฟล์ทับกัน (ดูรายละเอียดใน [.gitignore](.gitignore))

## วิธีเปิดดู

ไม่มีขั้นตอน build หรือ dependency ใดๆ เปิดไฟล์ HTML ที่ต้องการดูด้วยเบราว์เซอร์ได้โดยตรง หรือใช้ Live Server ก็ได้:

- หน้าแรก: `home/home.html`
- ทีมของเรา: `profile/profile.html`
- คุยงานกับเรา: `chat/chat.html`
- Portfolio แต่ละคน: `portfolio-1/index.html`, `portfolio-2/index.html`, `portfolio-3/index.html`

## สถานะปัจจุบัน

- [ ] `portfolio-3/index.html` ยังว่างเปล่า รอสมาชิกคนที่ 3 เริ่มทำ
- [ ] ข้อมูลติดต่อ (email/เบอร์โทร) ใน `home/home.html` และ `chat/chat.html` ควรตรงกัน
