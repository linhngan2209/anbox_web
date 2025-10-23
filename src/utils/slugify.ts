export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD") // chuyển ký tự có dấu thành không dấu
    .replace(/[\u0300-\u036f]/g, "") // xóa dấu
    .replace(/[^a-z0-9\s-]/g, "") // xóa ký tự đặc biệt
    .replace(/\s+/g, "-") // thay khoảng trắng bằng dấu gạch ngang
    .replace(/-+/g, "-") // gộp dấu gạch
    .replace(/^-+|-+$/g, ""); // xóa dấu gạch ở đầu/cuối
}
