'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Mô hình của ĂnBox là gì?',
    answer: 'ĂnBox cung cấp dịch vụ hộp nguyên liệu nấu ăn (meal kit) được chuẩn bị sẵn, giao tận nhà theo mô hình đăng ký định kỳ. Mỗi hộp bao gồm đầy đủ nguyên liệu tươi sạch, đã sơ chế, chia khẩu phần hợp lý cùng công thức hướng dẫn chi tiết, giúp bạn dễ dàng nấu được bữa ăn ngon trong thời gian ngắn. Tùy nhu cầu sử dụng, khách hàng có thể chọn gói 1 ngày, 1 tuần hoặc 1 tháng. Các món ăn được thiết kế đa dạng, phù hợp khẩu vị người Việt, từ bữa cơm gia đình đến những món ăn nhanh gọn cho dân văn phòng hoặc gia đình bận rộn. Với mô hình này, ĂnBox giúp bạn nấu nhanh, ăn ngon, tiết kiệm thời gian mà vẫn giữ được niềm vui chuẩn bị bữa ăn tại nhà — một trải nghiệm ấm cúng, tiện lợi và trọn vẹn cho nhịp sống hiện đại.'
  },
  {
    question: 'Thành phần của ĂnBox có an toàn và được chứng nhận không?',
    answer: '(Tạm thời chưa bổ sung)'
  },
  {
    question: 'Cách đặt hàng như thế nào?',
    answer: 'Bạn chọn gói ăn mong muốn. Sau khi cho hết các sản phẩm vào giỏ hàng, bạn điền đầy đủ thông tin giao hàng trên website, chọn thời gian giao hàng và hình thức thanh toán COD hoặc chuyển khoản. Lưu ý: ĂnBox không gọi điện xác nhận. Nếu gặp khó khăn, hãy gọi Hotline: 039 831 8612 hoặc inbox Fanpage: https://www.facebook.com/anboxvietnam/'
  },
  {
    question: 'ĂnBox giao hàng ở đâu?',
    answer: 'Hiện tại, chúng tôi phục vụ tại Thành phố Hà Nội. Dự kiến mở rộng sang các khu vực miền Bắc vào năm 2026.'
  },
  {
    question: 'Lưu ý khi sử dụng ĂnBox',
    answer: 'Các phần ăn sẽ được giao sau 2 ngày kể từ thời điểm đặt đơn và giao trong khung giờ mong muốn. Ngay sau khi nhận phần ăn, vui lòng để vào ngăn mát tủ lạnh để đảm bảo chất lượng tốt nhất.'
  },
  {
    question: 'Phần ăn ĂnBox có gì đặc biệt?',
    answer: 'Tỷ lệ tinh bột, chất béo và đạm trong mỗi phần nguyên liệu ĂnBox được tính toán kỹ lưỡng để đảm bảo cân bằng dinh dưỡng cho bữa ăn. Mỗi hộp bao gồm nguyên liệu tươi, sơ chế sẵn và công thức hướng dẫn chi tiết, giúp bạn nấu tại nhà mà vẫn giữ hương vị chuẩn. Tất cả được set đúng định lượng cho từng khẩu phần (1-2-4 người), giúp nấu vừa đủ, không lãng phí. ĂnBox không cung cấp gia vị hay món canh, tập trung vào nguyên liệu chính để bạn tự điều chỉnh hương vị.'
  },
  {
    question: 'Muốn đặt Gói tuần/tháng thì như thế nào?',
    answer: 'Các gói ăn theo tuần hoặc tháng của ĂnBox sẽ được giao liên tục trong thời gian đăng ký, giúp duy trì thói quen ăn uống lành mạnh. Giá từng gói được niêm yết rõ trên website, hoặc liên hệ Fanpage: https://www.facebook.com/anboxvietnam để được tư vấn. Một số lưu ý: Mức ưu đãi giá gói áp dụng khi sử dụng liên tục. Bạn có thể bảo lưu gói tối đa 2 tuần. Trường hợp bận đột xuất, ĂnBox hỗ trợ nghỉ ăn tối đa 3 ngày mỗi tháng mà vẫn giữ quyền lợi gói.'
  },
  {
    question: 'Tôi có thể hủy hoặc tạm dừng đăng ký gói của mình không?',
    answer: 'Có! Bạn có thể tạm dừng, hủy hoặc sửa đổi đăng ký bất cứ lúc nào. Không có hợp đồng ràng buộc.'
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Câu Hỏi Thường Gặp
          </h2>
          <p className="text-xl text-gray-600">
            Mọi thông tin bạn cần biết về ĂnBox
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button 
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-semibold text-gray-800">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-600 transition-transform duration-300 flex-shrink-0 ml-4 ${
                    openIndex === index ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
