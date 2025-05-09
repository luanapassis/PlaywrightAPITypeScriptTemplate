type produtos = {
    idProduto: string;
    quantidade: number;
  };
  
  
export class CartPayload {
    static creatCart({
      produtos
    }: {
      produtos: produtos[];
    }) {
      return {
        produtos
      };
    }
}