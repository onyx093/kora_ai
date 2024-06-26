import Image from "next/image";

export const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="relative w-10 h-10 animate-spin">
        <Image alt="loading image" fill src="/logo.png" />
      </div>
      <p className="text-sm text-muted-foreground">Kora AI is thinking...</p>
    </div>
  );
};
