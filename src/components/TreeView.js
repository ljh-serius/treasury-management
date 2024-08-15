import * as React from 'react';
import Box from '@mui/material/Box';

import { RichTreeView } from '@mui/x-tree-view/RichTreeView';

export default function BasicRichTreeView({ summaries, entities, onSelectSummary}) {

    const [selectedItems, setSelectedItems] = React.useState([]);

    const handleSelectedItemsChange = (event, ids) => {
        setSelectedItems(ids);
        onSelectSummary(ids);
    };
  
    console.log("ALLAH ALLAH ", selectedItems)
    
    const getDataObject = () => {
        if(Object.keys(summaries).length > 0 && entities.length > 0){
            const data = Object.keys(summaries).map((key) => {
                const relativeEntity = entities.filter((entity) => { return entity.id === key })[0];
                return {
                    id: relativeEntity.id,
                    label: relativeEntity.name,
                    children: Object.keys(summaries[key]).map((year) => {
                        return {
                            id: key + '-' + year,
                            label: year
                        }
                    })
                }
            })

            return data;
        }

        return [];
    }

    const items = getDataObject()

    return (
        <Box sx={{ minHeight: 100, minWidth: 250 }}>
            <RichTreeView
                items={items}
                selectedItems={selectedItems}
                onSelectedItemsChange={handleSelectedItemsChange}
            />
        </Box>
    );
}
