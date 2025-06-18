interface Genero {
  id: number;
  descripcion: string;
}

interface Categoria {
  id: number;
  descripcion: string;
}

interface Actor {
  id: number;
  nombre: string;
}

export interface Movie {
  id: number;
  poster: string;
  poster_id: string;
  titulo: string;
  blocked: number;
  categoria: Categoria[];
  resumen: string;
  temporadas: string;
  generos: Genero[];
  reparto: Actor[];
  trailer: string;
}