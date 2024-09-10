import { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const CustomersDemo = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const tabs = [
        { label: 'All', icon: 'pi pi-list' },
        { label: 'Tulkarm', icon: 'pi pi-map-marker' },
        { label: 'Gaza', icon: 'pi pi-map-marker' },
        { label: 'Hebron', icon: 'pi pi-map-marker' },
        { label: 'Ramallah', icon: 'pi pi-map-marker' },
        { label: 'Bethlehem', icon: 'pi pi-map-marker' },
        { label: 'Jerusalem', icon: 'pi pi-map-marker' },
        { label: 'Jenin', icon: 'pi pi-map-marker' },
        { label: 'Nablus', icon: 'pi pi-map-marker' },
        { label: 'Qalqilya', icon: 'pi pi-map-marker' },
    ];

    const content = [
        "Showing all results.",
        "Content for Tulkarm.",
        "Content for Gaza.",
        "Content for Hebron.",
        "Content for Ramallah.",
        "Content for Bethlehem.",
        "Content for Jerusalem.",
        "Content for Jenin.",
        "Content for Nablus.",
        "Content for Qalqilya."
    ];

    return (
        <div>
            <TabMenu 
                model={tabs} 
                activeIndex={activeIndex} 
                onTabChange={(e) => {
                    console.log(e.value);
                        
                    return setActiveIndex(e.index)
                }} 
            />
            <div className="p-mt-4">
                <h3>{tabs[activeIndex].label}</h3>
                <p>{content[activeIndex]}</p>
            </div>
        </div>
    );
}

export default CustomersDemo;
