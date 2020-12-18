export default interface ToastInterface {
  type: "icon" | "success" | "error" | "loading";
  title: string;
  message: string;
  duration: number;
}
