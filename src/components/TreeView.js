import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BasicRichTreeView({ data, entities, onSelectSummary }) {
    const [selectedItems, setSelectedItems] = React.useState([]);
    const [items, setItems] = React.useState([]);
    
    const navigate = useNavigate();
    const location = useLocation();
    
    const handleSelectedItemsChange = (event, ids) => {
        setSelectedItems(ids);
        onSelectSummary(ids);

        // Redirect to /books if the current path is not /books
        if (location.pathname !== '/books') {
            navigate('/books');
        }
    };

    useEffect(() => {
        const getItems = () => {
            if (data && entities) {
                const newItems = [
                    {
                        id: 'historical',
                        label: 'Historical Book',
                        children: entities.map((entity, entityIndex) => {
                            const yearItems = data.summaries[entity.id]
                                ? Object.keys(data.summaries[entity.id]).map((year) => ({
                                      id: `year-${entity.id}-${year}`,
                                      label: year,
                                  }))
                                : [];

                            return {
                                id: `entity-${entity.id}`,
                                label: entity.name,
                                children: yearItems,
                            };
                        }),
                    },
                ];

                return newItems;
            }

            return [];
        };

        const mainItems = getItems();
        setItems(mainItems);
    }, [data, entities]);

    return (
        <Box sx={{ mt: 2, mb: 1, minHeight: 50, minWidth: 250 }}>
            <RichTreeView
                items={items}
                selectedItems={selectedItems}
                onSelectedItemsChange={handleSelectedItemsChange}
            />
        </Box>
    );
}
