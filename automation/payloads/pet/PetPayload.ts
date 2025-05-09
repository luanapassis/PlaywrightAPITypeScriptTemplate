type Category = {
    id: number;
    name: string;
  };
  
  type Tag = {
    id: number;
    name: string;
  };
  
  export class PetPayload {
    static createPet({
      id,
      category,
      name,
      photoUrls,
      tags,
      status,
    }: {
      id: number;
      category: Category;
      name: string;
      photoUrls: string[];
      tags: Tag[];
      status: 'available' | 'pending' | 'sold';
    }) {
      return {
        id,
        category,
        name,
        photoUrls,
        tags,
        status,
      };
    }
  }
  