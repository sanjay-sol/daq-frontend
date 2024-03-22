import Link from "next/link";
import { Button } from "../components/ui/button";

const App = () => {
  const url = "https://github.com/sanjay-sol/nextjs-frontend-template";
  return (
    <div>
      <Button type="submit" className="bg-primary-500">
      <Link href={url} target="_blank" >
         Source Code
      </Link>
      </Button>
    </div>
  );
};

export default App;
