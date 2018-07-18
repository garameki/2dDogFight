#encoding:shift_jis




require "kconv"


filename = ENV["FILENAME"].tosjis



text=""
File.open(filename,"r"){|file|#←ファイル名を任意で変えてください
	text = file.read(file.size)
}
text=text.tosjis
text=text.gsub(/\r/,"")
text=text.gsub(/\s*?\/\/.*?\n/,"")


flag = true
while(mat = text.match(/(?<pat>[^\n{}]*\{+(?:\g<pat>)*[^{}]*\}(?:\g<pat>)*)/m))


	ma = mat.to_s


	puts ma if flag

	if ma.count("{") != ma.count("}")

		puts "{=",ma.count("{"),"   }=",ma.count("}")
		puts "括弧の数が違います"
		o=gets()
	end

	maas = ma.split(/\n/m)#行に分割
	maaA = maas[0].match(/\A\s*/)
	maaZ = maas[-1].match(/\A\s*/)

	if (maaA.to_s.size != maaZ.to_s.size) && flag

		print "ここがあやしいです!!!!!!!!!!!!!!!!!!!!!"

		o=gets()
		flag = false
	end

	text = text.sub(mat.to_s,"")

	puts "++++++++++++++++++++++++++++++++++++++++++++++++++++" if flag
end

conts = text.scan(/.*[{}].*/)

puts "=============== error place ==========================================="
conts.each{|cont|
	puts cont
}
puts "======================================================================="

puts;puts