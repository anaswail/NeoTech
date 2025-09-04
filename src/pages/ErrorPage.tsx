import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="flex justify-center items-center w-full h-screen flex-col gap-10">
      <h1 className="text-8xl font-semibold">404 Not Found</h1>
      <p className="text-xl">
        Your visited page not found. You may go home page.
      </p>
      <Button
        onClick={handleNavigate}
        variant="default"
        className="text-lg p-8  "
      >
        Back to Home Page
      </Button>
    </div>
  );
};

export default ErrorPage;
