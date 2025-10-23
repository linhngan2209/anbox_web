"use client";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-[#FFF8F2] text-gray-800">

      {/* Hero Section */}
      <section className="relative w-full h-[400px]">
        <Image
          src="/about-hero.jpg"
          alt="Ảnh về ĂnBox"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 text-center px-6">
          <h1 className="text-5xl font-bold text-white mb-4">
            ĂnBox – Nấu dễ dàng, ăn an tâm
          </h1>
          <p className="text-lg text-white max-w-xl">
            Giải pháp meal-kit tiện lợi giúp bạn nấu ngon, ăn lành và tận hưởng trọn vẹn từng bữa cơm nhà.
          </p>
        </div>
      </section>

      {/* Giá trị cốt lõi */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center text-orange-600 mb-12">
          Giá trị cốt lõi của ĂnBox
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-2xl font-semibold text-orange-600 mb-3">
              Công thức đáng tin cậy
            </h3>
            <p>
              Cam kết mang đến những bữa ăn tiện lợi, tiết kiệm thời gian, phù hợp với lối sống bận rộn và ngân sách của mỗi gia đình Việt.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-2xl font-semibold text-orange-600 mb-3">
              Nguyên liệu tươi sạch
            </h3>
            <p>
              Chọn lọc nguyên liệu đạt chuẩn, được sơ chế kỹ lưỡng và chia khẩu phần chính xác để giữ trọn vị ngon và dinh dưỡng.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-2xl font-semibold text-orange-600 mb-3">
              Đa dạng món ngon
            </h3>
            <p>
              Mang đến thực đơn phong phú, nhiều lựa chọn món ăn thuần Việt với công thức từ đầu bếp, giúp việc nấu ăn tại nhà luôn mới mẻ và thú vị.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-2xl font-semibold text-orange-600 mb-3">
              Giải pháp bền vững
            </h3>
            <p>
              Giảm thiểu lãng phí thực phẩm, hướng đến thói quen ăn uống lành mạnh và bền vững hơn cho bạn và môi trường.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-2xl font-semibold text-orange-600 mb-3">
              Trọn vẹn yêu thương
            </h3>
            <p>
              Giúp các gia đình và cá nhân tìm lại niềm vui bên mâm cơm nhà — nơi mỗi bữa ăn không chỉ là dinh dưỡng mà còn là sự sẻ chia và kết nối.
            </p>
          </div>
        </div>
      </section>

      {/* Câu chuyện của ĂnBox */}
      <section className="bg-orange-50 py-16 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2 order-1">
            <Image
              src="/about-story.jpg"
              alt="Câu chuyện của ĂnBox"
              width={600}
              height={400}
              className="rounded-2xl shadow-lg object-cover"
            />
          </div>
          <div className="md:w-1/2 order-2 text-left">
            <h2 className="text-4xl font-bold text-orange-600 mb-4">
              Câu chuyện của ĂnBox
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Bữa cơm gia đình từ lâu đã luôn là bữa ăn ngon nhất — một bữa ăn mà không món ăn nào trên thế giới có thể thay thế.
              Thế nhưng, trong nhịp sống hiện đại, bữa cơm ấy lại dần trở thành một “xa xỉ phẩm”, đặc biệt với những gia đình bận rộn nơi đô thị.
              <br /><br />
              Đó là lý do chúng tôi tạo ra <b>ĂnBox meal-kit</b>: mang đến những hộp nguyên liệu tươi ngon, được sơ chế sẵn, chia khẩu phần chuẩn và kèm công thức từ đầu bếp.
              Với sự hỗ trợ từ AI trong quản lý menu và đăng ký, ĂnBox giúp bạn tiết kiệm thời gian, giảm áp lực bếp núc và khơi gợi lại hương vị ấm áp của bữa cơm gia đình.
            </p>
          </div>
        </div>
      </section>

      {/* Sứ mệnh của ĂnBox */}
      <section className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2 text-left order-1">
          <h2 className="text-4xl font-bold text-orange-600 mb-6">
            Sứ mệnh của ĂnBox
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Đơn giản hóa và làm phong phú trải nghiệm nấu ăn tại nhà cho các gia đình Việt
            và người bận rộn thông qua meal-kit tươi sạch, công thức từ đầu bếp, được quản lý
            hiệu quả bằng AI và mô hình đăng ký tiện lợi.
          </p>
        </div>
        <div className="md:w-1/2 order-2">
          <Image
            src="/about-mission.jpg"
            alt="Sứ mệnh ĂnBox"
            width={700}
            height={400}
            className="rounded-2xl shadow-lg object-cover"
          />
        </div>
      </section>

    </div>
  );
}
