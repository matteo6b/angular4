export class Video {
  favorited: boolean;
  constructor(
    public _id: string,
    public title: string,
    public description: string,
    public file: File,
    public tags: String[]
  ) {}
}
