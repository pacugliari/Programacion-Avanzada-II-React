export interface Genre {
  idGenero: number;
  descripcion: string;
}

export interface Category {
  idCategoria: number;
  descripcion: CategoryType;
}

export interface Actor {
  idActor: number;
  nombre: string;
}

export enum CategoryType {
  SERIE = "Serie",
  PELICULA = "Película",
}

export interface Movie {
  id: number;
  poster: string;
  poster_id: string;
  titulo: string;
  blocked: number;
  categoria: Category[];
  resumen: string;
  temporadas: string;
  generos: Genre[];
  reparto: Actor[];
  trailer: string;
}
