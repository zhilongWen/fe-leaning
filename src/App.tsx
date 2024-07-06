import {Routes, Route} from 'react-router-dom'
import MyLayout from "./components/MyLayout.tsx";
import Dashboard from "./pages/dashboard.tsx";
import Users from "./pages/user.tsx";
import MedicineList from "./pages/medicine/list.tsx";
import MedicineCategories from "./pages/medicine/categories.tsx";
import ArticleCategories from "./pages/articles/categories.tsx";
import ArticleList from "./pages/articles/list.tsx";

function App() {

    return (
        <MyLayout>
            <Routes>
                <Route path='dashboard' element={<Dashboard/>}/>
                <Route path='users' element={<Users/>}/>
                <Route path='medicine/categories' element={<MedicineCategories/>}/>
                <Route path='medicine/list' element={<MedicineList/>}/>
                <Route path='articles/categories' element={<ArticleCategories/>}/>
                <Route path='articles/list' element={<ArticleList/>}/>
            </Routes>
        </MyLayout>
    )
}

export default App
