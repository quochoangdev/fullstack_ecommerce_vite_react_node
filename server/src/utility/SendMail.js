import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'quochoangdev.official@gmail.com',
        pass: 'bekmekhpcupeyvnl'
    }
});

async function sendEmail(req, res) {
    const { userLogin, dataCheckout, value } = req?.body?.data;
    if (!dataCheckout || !value) {
        return res.status(400).send('Invalid request');
    }

    const formatNumber = (number) => number.toLocaleString("vi-VN");

    const emailContent = `
        <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
            <h2>Hoá Đơn Thanh Toán Sản Phẩm</h2>
            <p>Xin chào ${userLogin?.lastName} ${userLogin?.firstName},</p>
            <p>Cảm ơn bạn đã mua sắm tại QuocHoangDev. Dưới đây là chi tiết đơn hàng của bạn:</p>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr>
                        <th style="border: 1px solid #ddd; padding: 8px;">#</th>
                        <th style="border: 1px solid #ddd; padding: 8px;">Hình ảnh</th>
                        <th style="border: 1px solid #ddd; padding: 8px;">Tên sản phẩm</th>
                        <th style="border: 1px solid #ddd; padding: 8px;">Giá</th>
                        <th style="border: 1px solid #ddd; padding: 8px;">Màu</th>
                        <th style="border: 1px solid #ddd; padding: 8px;">Dung lượng</th>
                        <th style="border: 1px solid #ddd; padding: 8px;">Số lượng</th>
                    </tr>
                </thead>
                <tbody>
                    ${dataCheckout.map((product, index) => `
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">${index + 1}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">
                                <img src="${product?.image}" alt="${product?.title}" style="width: 50px; height: auto;" />
                            </td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${product?.title}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${formatNumber(product?.priceDiscount)}₫</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${product?.color}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${product?.capacity}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${product?.quantity}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <p>Tổng tiền: <strong>${formatNumber(value)}₫</strong></p>
            <p>Chúng tôi sẽ sớm giao hàng đến bạn.</p>
            <p>Trân trọng,</p>
            <p>QuocHoangDev</p>
        </div>
    `;

    try {
        const info = await transporter.sendMail({
            from: '"ECommerce QuocHoangDev 👻" <quochoangdev.official@gmail.com>',
            to: `quochoang22603@gmail.com,${userLogin?.email}`,
            subject: "Hoá Đơn Thanh Toán Sản Phẩm",
            html: emailContent,
        });
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send('Error sending email');
    }
}

module.exports = sendEmail;
