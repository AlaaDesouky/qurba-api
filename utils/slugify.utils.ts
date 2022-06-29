export const slugify = (name: string): string => {
  return name.toLocaleLowerCase().trim().replace(/ /g, '-')
}