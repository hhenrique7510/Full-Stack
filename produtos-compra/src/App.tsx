import { useState } from 'react'
import './App.css'
import { AppSidebar } from "@/components/ui/app-sidebar";





function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex">
      <AppSidebar />
    </div>
  );
}

export default App
