from time import sleep
import requests
class _response:
	def __init__(self):
		self.ok = ""
		self.error = ""
class Book:
	def __init__(self, obj=None):
		if(obj is not None):
			self.title = obj.values()[1]
			self.author = obj.values()[0]
			self._response = _response	
		else:
			self.title = ""
			self.author = ""
			self._response = _response

	#this function append the base path to api url request
	def _url(self,path):
		return 'http://localhost:3000' + path


	def create(self):
		print self.title
		print self.author
		url = self._url('/book')
		res = self.getAll()
		for book in res.json()['item']['book']:
			last_id = book['bookid']
		last_id = int(last_id)+1
		res = requests.post(url, data={"bookid": last_id,"title": self.title,'author': self.author,})
		print res.json()
		self._response.ok = "true"
		return res

	def get(self,id):
		url = self._url('/book/{}'.format(id))
		res = requests.get(url)
		if(res.json()['ok'] == False):
			self._response.ok = "false"
			self.title  = ""
			self.author = ""
		else:
			self.title  = res.json()['item']['book']['title']
			self.author = res.json()['item']['book']['author']
			self._response.ok = "true"
		return res.json()['ok']
	def getAll(self):
		url = self._url('/book')
		return requests.get(url)
