import { useState} from 'react'
import Overview from "../components/Overview.jsx";
import ProfileUpdate from "../components/ProfileUpdate.jsx";
const Profile = () => {
    const [selectedTab, setSelectedTab] = useState('Overview'); // store string key

    const tabsAndComponents = {
        'Overview': Overview,
        'Profile': ProfileUpdate
    }

    const SelectedComponent = tabsAndComponents[selectedTab]; // derive component from key

    return (
        <div>
            <h1 className='text-3xl font-bold text-zinc-900 py-4'>Update Your Profile</h1>
            <div className='flex items-center justify-start gap-8 px-4 border-b border-gray-300'>
                {Object.keys(tabsAndComponents).map((tab) => (
                    <div
                        key={tab}
                        className={`text-xl px-4 transition-all duration-200 cursor-pointer
                            ${selectedTab === tab
                            ? 'text-green-700 border-b-2 border-red-700'
                            : 'text-zinc-600 hover:text-zinc-900'
                        }`}
                        onClick={() => setSelectedTab(tab)}
                    >
                        {tab}
                    </div>
                ))}
            </div>
            <div>
                <SelectedComponent />  {/* render derived component */}
            </div>
        </div>
    )
}
export default Profile;