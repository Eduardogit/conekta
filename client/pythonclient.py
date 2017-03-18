import Library

book = Library.Book()
opc  = 0
	
print "\n\nPython Hapi Client\n\n"
while opc != 4 :
	try:
		opc = int(input("Acciones \n[1]Consultar Todos\n[2]Consultar por Id\n[3]Crear Nuevo\n[4]Salir \n>:"))
		if(opc == 1):
			resp = book.getAll()
			#print resp.json()['ok']
			for book in resp.json()['item']['book']:
				print 'Titulo: {} Author:{} '.format(book['title'],book['author'])
		if(opc == 2):
			id = input('Ingresa el id \n>:')
			book = Library.Book()
			book.get(id)	
			if(book._response.ok == "true"):
				print book.title
				print book.author
				print book._response.ok
			else:
				print book._response.ok
		if(opc == 3):
			title = raw_input('Titulo:\n>:')
			auth  = raw_input('Autor:\n>:')
			book = Library.Book({
				"title": title,
			  	"author": auth
			})
			book.create()
			print book._response.ok
		elif (opc != 4):
			print "Para salir pulse 4!"
			opc = 0
	except Exception, e:
		print e
