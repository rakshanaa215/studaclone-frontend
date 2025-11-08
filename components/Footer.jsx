export default function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="container mx-auto px-4 py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Studaclone. All rights reserved.
      </div>
    </footer>
  )
}
