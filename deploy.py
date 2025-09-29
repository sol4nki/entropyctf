from datetime import datetime



def announcement(title='notice', header='time left', lines = [datetime.now()
] ):
    # one major issue, datetime.now() will just take fn calling time not actual date time so it will just give delayed time F
    # fix can be to use liek datetime.now() after fn called and check for -> datetime.now() if lines else [] 
    '''
    the input -> str(title), str(header) and list(lines)

    output html format is going to be like: (in logs)

    <bold> title </bold> - header
    lines[0]
    lines[1]
    .
    .
    .
    lines[n]
    '''

    if lines < 1:
        return 0
    else:
        textList = [title, header]
        textList.extend(lines)


def request(name=None):
    # in table (for entire server somehow idk [most prolly dynamically update website everytime someone steals/updates])

    '''
    the input -> str(name)

    output html format is going to be in table: (on leaderboard)
    leaderboard sections updated for everyone
    '''
    if name:
        points=None
        # check points in db and 
        return points
    else:
        return 0

def checker(flag=None, lvl=0, team=None):
    '''
    the input -> str(flag), int(lvl) and str(team)

    output format -> announcement() fn call + points append to team

    
    '''
    if flag and lvl and team:
        flaglvl = (flag, lvl) # send this to db and check for response
        servercheck = 0 #function to check server/db
        # check flag in db
        # if true (run announcement)


        if servercheck:
            #append points too.
            announcement(f'lvl{lvl} cleared ', 'check linux code first' , ['by team xyz (same html copy paste)', 'xyz xyz xyz lvl wtv check linux wala for text'])
            return 1
        else:
            return 0
    else:
        return 0
    
def stealer(team=None, key=None):
    '''
    the input -> str(team) and str(key)

    output format -> announcement() fn call + points append to team + points remove from team

    
    '''
    if team and key:
        # check dba (decrypt key and check wtv condition i have (secret))
        secureconnect = 0 # here will be the fn for securely connecting to server
        #random points also steal
        if secureconnect:
            points_append = 0 # add to provided "team"
            points_remove = 0 # remove from the db key
            announcement('stolen (check linux)', 'check linux', ['check linux', 'check linux'])

    else:
        return 0

def login(email=None, passkey=None):
    # compare sha256 hash of passkey to db sha256 hash of passkey
    if email and passkey:
        validation = 0 # fn for validation
                       # chances of someone modifying packets recieving back from server tho? 
                       # or not? figure out FFFFFFFFFFFF idk idk
        if validation:

            return 1
        else:
            return 0
    else:
        return 0

def rightrotate(w1=None, num=0):
    '''
    the input -> str(w1) and int(num)

    output format -> gives rotated str in this case
    but technically binary so last (num) elements are taken
    and put in the front i.e LSB put into MSB (most sig bit and least sig bit)
    that is it and returned is a string 

    update -> returning binary now
    
    '''


    if w1 and num:
        # lastNumElements = w1[len(w1)-num::1]
        # lastNumElements += (w1[0:len(w1)-num:1])
        # return lastNumElements
        return ((w1 >> num) | (w1 << (32 - num))) & 0xFFFFFFFF
        
    else:
        return 0

def rightshift(w1=None, num=0):
    '''
    the input -> str(w1) and int(num)

    output format -> gives right shifted str in this case
    but technically binary so last (num) elements are taken
    and removed completely i.e LSB removed and MSB inserted zeroes
    that is it and returned is a string 

    update -> returning binary now
    
    '''
    if w1 and num:
        # shiftedElements = '0'*num
        # shiftedElements += (w1[0:len(w1)-num:1])
        # return shiftedElements
        return (w1 >> num)
        
    else:
        return 0

def sha256(normal):
    # hello github <3
    '''
    the input -> str(normal)

    output format -> returns sha256 hash of str(normal)

    '''
    if normal:
        # since normal is no way in hell going to be longer than
        # 512 bits ill just assume its always less than 512 for simplicity
        # enc = []
        # for i in normal:
        #     enc.append(bin(ord(i))[2:].zfill(8))
        # enc.append('10000000')
        # for i in range(63 - len(enc)):
        #     enc.append('00000000') # yes this will turn into just 0 but i am doing it for ease of readability.
        # enc.append(bin(len(normal)*8)[2:].zfill(8))
        
        # well i was converting all into ints now cause strings operations are too longg
        enc = [ord(char) for char in normal]
        enc.append(0x80)                 # bit 1000000
        while (len(enc) % 64) != 56:     # stackoverflow _/\_
            enc.append(0x00)
        enc += list((len(normal) * 8).to_bytes(8, 'big'))
        # just hash values here 
        # h0 = "01101010000010011110011001100111"
        # h1 = "10111011011001111010111010000101"
        # h2 = "00111100011011101111001101110010"
        # h3 = "10100101010011111111010100111010"
        # h4 = "01010001000011100101001001111111"
        # h5 = "10011011000001010110100010001100"
        # h6 = "00011111100000111101100110101011"
        # h7 = "01011011111000001100110100011001"
        h0 = 0x6a09e667
        h1 = 0xbb67ae85
        h2 = 0x3c6ef372
        h3 = 0xa54ff53a
        h4 = 0x510e527f
        h5 = 0x9b05688c
        h6 = 0x1f83d9ab
        h7 = 0x5be0cd19

        h0_copy = 0x6a09e667
        h1_copy = 0xbb67ae85
        h2_copy = 0x3c6ef372
        h3_copy = 0xa54ff53a
        h4_copy = 0x510e527f
        h5_copy = 0x9b05688c
        h6_copy = 0x1f83d9ab
        h7_copy = 0x5be0cd19



        # 2 - 311 rounds contants k ffff
        k = [
                0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
                0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
                0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
                0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
                0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
                0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
                0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
                0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
                0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
                0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
                0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
                0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
                0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
                0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
                0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
                0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
            ]

        # == initiating chunk loop NO NO message schedular before that i.e. w banana hai with 32-bit words w[0..63] all 32 bit from enc (8*4)
        # w = []
        # for i in range(16):
        #     string8star4 = ''
        #     for o in range(i*4,i*4 + 4):
        #         string8star4+=enc[o]
        #     w.append(string8star4)
        w = []
        for i in range(16):
            binary8star4 = (enc[4*i] << 24) | (enc[4*i+1] << 16) | (enc[4*i+2] << 8) | enc[4*i+3] # wiki
            w.append(binary8star4)

        # NOW NOW NOTICE ->> SINCE I STATED WE WONT GO BEYOND 512 WE KNOW W CANT BE MORE THAN 16*32 = 512
        # HENCE! NO NEED TO DOUBLE CHECK FOR BLOCKS IF THEY ARE BOUND OR NOT (they are bound.)
        # so just fill with zeroes till 64 (i.e. 16..64)

        for i in range(16, 64):
            w.append(0x00)
        
        for i in range(16,64,1):
            s0 = ((rightrotate(w[i-15], 7)) ^
                rightrotate(w[i-15], 18) ^
                rightshift(w[i-15], 3))

            s1 = (rightrotate(w[i- 2], 17) ^
                rightrotate(w[i- 2], 19) ^
                rightshift(w[i- 2], 10))

            w[i] = (w[i-16] +
                    s0 +
                    w[i-7] +
                    s1) & 0xFFFFFFFF # THIS FIXED ALOT DAMN FFFFFF BECAUSE PYTHON BITS DONT OVERFLOW THEY KEEP GOING SO KEEP 111..111 AND WITH THAT TO ONLY KEEP 32 least sig BITS AND REMOVE ALL OVERFLOWS

        for i in range(64):
            S1 = (rightrotate(h4, 6) ^ rightrotate(h4, 11) ^ rightrotate(h4, 25))

            ch = (h4 & h5) ^ ((~h4) & h6) 

            temp1 = (h7 + S1 + ch + k[i] + w[i]) & 0xFFFFFFFF

            S0 = (rightrotate(h0, 2) ^ rightrotate(h0, 13) ^ rightrotate(h0, 22))

            maj = (h0 & h1) ^ (h0 & h2) ^ (h1 & h2)

            temp2 = (S0 + maj) & 0xFFFFFFFF

            h7 = h6
            h6 = h5
            h5 = h4
            h4 = (h3 + temp1) & 0xFFFFFFFF
            h3 = h2
            h2 = h1
            h1 = h0
            h0 = (temp1 + temp2) & 0xFFFFFFFF


 
        h0 = (h0 + h0_copy) & 0xFFFFFFFF
        h1 = (h1 + h1_copy) & 0xFFFFFFFF
        h2 = (h2 + h2_copy) & 0xFFFFFFFF # FFFF reason above.
        h3 = (h3 + h3_copy) & 0xFFFFFFFF
        h4 = (h4 + h4_copy) & 0xFFFFFFFF
        h5 = (h5 + h5_copy) & 0xFFFFFFFF
        h6 = (h6 + h6_copy) & 0xFFFFFFFF
        h7 = (h7 + h7_copy) & 0xFFFFFFFF

        ncrypt = ''.join(f'{h:08x}' for h in [h0,h1,h2,h3,h4,h5,h6,h7])


        return ncrypt

        # return encrypted


    else:
        return 0
    

if __name__ == '__main__':
    # print(0x6a09e667)
    # print(bin(ord('h'))[2:].zfill(8))
    normal = 'hi'
    # enc = []
    # for i in normal:
    #     enc.append(bin(ord(i))[2:].zfill(8))
    # enc.append(10000000)
    # print(enc)
    # for i in range(64 - len(enc)):
    #     enc.append(00000000) 
    # print(enc, len(enc))
    # enc = []
    # for i in normal:
    #     enc.append(bin(ord(i))[2:].zfill(8))
    # enc.append('10000000')
    # for i in range(63 - len(enc)):
    #     enc.append('00000000') # yes this will turn into just 0 but i am doing it for ease of readability.
    # enc.append(bin(len(normal)*8)[2:].zfill(8))
    # print(enc, len(enc))
    # w = []
    # for i in range(16):
    #     string8star4 = ''
    #     for o in range(i*4,i*4 + 4):
    #         string8star4+=enc[o]
    #     w.append(string8star4)
    # print(w, len(w))
    etc = '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4'
    assert etc == sha256('hi')
    print(sha256('hi'))
    print(f'{etc} this is actual hash of hi')
    # print(rightrotate('01101000011001010110110001101100', 1))
    # print(rightshift('01101000011001010110110001101100', 16))
    #ya