import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'quochoangdev.official@gmail.com',
        pass: 'bekmekhpcupeyvnl'
    }
});

async function sendMailContact(req, res) {
    const { name, phone, product, budget, message } = req?.body.data;
    const emailContent = `
        <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
            <h2>Liên hệ với chúng tôi</h2>
            <p><strong>Họ và tên:</strong> ${name && name}</p>
            <p><strong>Số điện thoại:</strong> ${phone && phone}</p>
            <p><strong>Sản phẩm:</strong> ${product && product}</p>
            <p><strong>Ngân sách:</strong> ${budget && budget}</p>
            <p><strong>Lời nhắn:</strong> ${message && message}</p>
        </div>
    `;

    try {
        const info = await transporter.sendMail({
            from: '"Contact Form QuocHoangDev 👻" <quochoangdev.official@gmail.com>',
            to: `quochoang22603@gmail.com`,
            subject: "Liên hệ từ khách hàng",
            html: emailContent,
        });
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send('Error sending email');
    }
}

module.exports = sendMailContact;
