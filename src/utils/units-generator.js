import { v4 as uuidv4 } from 'uuid';

export const generateRandomDate = () => {
    const end = new Date();
    const start = new Date(end.getFullYear() - 15, end.getMonth(), end.getDate());
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  };
  
export const generateRandomUnits = (count, unitType) => {
    const newWorkUnits = [];
    const newProductUnits = [];
    const categories = [
      'Category A', 'Category B', 'Category C', 'Category D', 'Category E',
      'Category F', 'Category G', 'Category H', 'Category I', 'Category J'
    ];
  
    for (let i = 0; i < count; i++) {
      const randomDate = generateRandomDate();
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const unit = {
        id: uuidv4(),
        description: `Unit ${i + 1}`,
        quantity: Math.floor(Math.random() * 100) + 1,
        unitPrice: (Math.random() * 100).toFixed(2),
        date: randomDate,
        category: randomCategory,
        type: unitType,
      };
      unit.totalAmount = parseFloat(unit.unitPrice) * parseInt(unit.quantity);
      if (i % 2 === 0) {
        newWorkUnits.push({
          ...unit,
          hoursWorked: (Math.random() * 10).toFixed(2),
          rate: (Math.random() * 50).toFixed(2),
        });
      } else {
        newProductUnits.push(unit);
      }
    }
    return { newWorkUnits, newProductUnits };
  };
  