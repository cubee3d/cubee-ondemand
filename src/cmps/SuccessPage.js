import { Button } from "@mui/material";
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';

export const SuccessPage = ({repeat, orderId}) => {
    return(
        <div dir="ltr">
            <div>
                <img // Need to add correct image
                    className="model-img"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANgAAADpCAMAAABx2AnXAAABdFBMVEX///9NTU0REiRgYGA8PDyJiYlDU2IvP05icoHC0uGqwtpoaGgzRFSQsdCru8oAAADa2tvExMTbVQDMPgBWVlZAQECjUgCGhobl5eU3NzfxbQBKSkphb3uBgYFbW1mJpcC3xtSioqJ1dXUxMTFNOzhxcXHr6+ujuc4AABq7u7tlZGPR0dEkNUUAABuWlpaoqKizs7O5agB2RC5waF+isb0AABOgSgD8cAApKSlJT1NSYW9ARk2UlJpweoMbMkWMmqh9jJsvMD1BQUweHy5sbXaHh5BRUVxYYGeFaUqfelOaVRKuXgCyaxOXgGmsci+QhHe1flald0Te2NLEo4qcfFnQu6rAlnmkZDeqZSunl5DWyLyvcUKjgW64h2KgPgAyPEOIUjNeQzGkcU2VUiMkQ1ffaAzDYSOPUCiEUz3hv7LVTwR1T0DmZAfIOgFxPCNDLibPVzCJQynKgF+UPB/aflLgbjixeGfQMgBlOS28X0C5PAZ2jqRbikhnAAASlklEQVR4nO2di3fbxpXGTYIPyaRE0IZEURQRkQwpPsSHU1HWA5REEiDbJLvdderWbR5KG6e7ceM2TdpmU//zO3hy7mDwBkHa4XeikwiSj+bne7+Le2cQ6MGDjTbaaKONNtpoo4022mijjX5uOlj1ApajRqVceRfRBuVCslDur3oZYStfKCRlFcr5VS8lTLG9clJXuceuejlhqdEvF5KYypXGqpfkqEbjwHGRLYil5OMgisX5Fitc3SBlRwMbuE6SxFLQkutrtcbo9DSdlZW+yQoWaAeYuaDW1mqdtEql6vSUVscJc5WZKvh0La3WucG5kG6OTMvUS7yWfUwxlsngASyUW6tYuq0aN1lS6SzMrU4SZGFmr5hAYJk6frW8dla7SpvAkNU6i28gzFUtFRMJBSzTroN87K1VlzUwB0xJR52sMYDm4mQsDQypCvKxv0ZWSxkBS4MaklazMQ9LPJNQuQwwwmqFtbFaxwhY+khKnS7Q0ln0t89CrPqehoWDEWjJjvMPjUKSjpKWF8SOFomZPkLDCY5VLhlYEGwtraZz3Wg3r9YiH0/nAIvDsCCYyWp27UtEYvUIpY0r2YXpsOVmioCLBCOttvLSPzjVGATjUmNBlqKYywqMvKutuMvSLYbft9iFzUR1lTESiwaG8hF2WSu1mn53TuOuEE4NNDmveDMWHSzzy19Bq60M68EDPTRXi0udQnJuJOPcZC47sA8/+vg/1sNqDT1gI/2KOvkv7tMlKpYV2P7+R//5a1D6V2Q1lqgd+nAiGiG7p3NBsLYOdv5f5/tP/hvk42oGGr3v0EawxeSfMkLmDNauj+oyWpv5/Fnjk/P9j578BqCtosvK62Cyz/HhpJp1CNkCrH338OHDW4RVzh8cNJ6f76N8hFZbQZfV0sBuWg8OYP9khCztANYePVR0OzhA+u2+KtJqUZd+/f580yKHk3uHXDTAmBOFa1vGer5/vq+LsFrEA40Kls6O4OTfRqXQIRdjIGDHLMJidz/cx/TRx8Bq0Q40Clh6DnfV1P7p3j4XDbBbxKVgHT98+LsF1vmLF/tPPoZdVoRWQ2DpFNxVM4YT+1yMLTJRycJtOXAv9Ew83/+k8QyVx1+saqAZ3KREiLUYTlyBtZljGYtVC0j/dwrZ+flvn6EC+QKBrWqgGYCRK5lsJxaNxr2tyVQwptDRslDT71Gwzj/9A8L6w6fnChg5YEdiNbZHMZcJjGoyGYypt4wsNPTZi+fo2rPPz+U7tQIW+UCD+ieQheRwYpuLMdRH9eVoQSyt7n9yrtynNbCIB5oWLPHm4cQejOmhWthoVU8gllIgP/1CLfgGGGG1whIHGuLkJJMwd/Fpa7DiRUY2V6fAtAGYXvd/v39OgEW0d8ASm7umyR+YzFQ9aqV+AxH0mHYGB2MXqXnyGUrGJ08Eo/E372UtwWrkyQll8pejooO9/PKPAK1Yk7PwYJBh5OUaYNuwkJz9CVVFpTteBA232hIGmhZ5ckIN1/1XL15qYF89/TBhoBUvqp3GQSNfZdQ4nGBYLPBb5TO1O263LfIx3L0D8uSEYi6Z64Ovn/5ZB/vy6dPD/9HIanweYXXqe3qCnQBzUXWHoYEfXiiHVh+pJydmrD/++fDwEAM7PHz69QcIrbanlPhkrRbDwbbNtzOgEx2tCrvSKhdWDelTT05M+vDwEAf736fq5+/XknKJ7+/VsCb4xBFLQZMQWp3oSjNMSGD5sgtzIT1SQb7GI4b09PA5qoV57kL+nkWvyJrMRUcbQaxChmHCAevALDRv7up6//WrbxWQr17KaC+vv1a4Dr999U2jU63h52PKdoC1uXCdAaxklWHCAWtUYBZabavJYI8fv36lJt9fsi9LX6pc3z569OqbnhFkpVdsD1xkoYYFn3tpMyGB0Y8lLcEQ2iM5Zoo0LKS/1oxvQr1iu+IW60SAWBmGCQcMnvmD4cQK7PHrx98eGnqk6oPFN8WYJGqqGvnyiTPXLfjphTrDhAPmqn8ygRn5qIcLgF1wirl6DOMIRmRhlWHCAfNgLgJMQzOwFmC1hJKFfaJXpGYh3VzBweBjXWXqyYklGNIjXCpYsVZmUd1vVWGv6MlcQcFcDCcOYI9JsOIFozRVZdgr0s1FnM0zpHyCkf2Tk7ncgNVKA3liKRO9oldzBQFzN5x4A6slerK5KsUa2Ff0k4W+wUzDiUssO7C/KhPLgKuRO8FmCfDHU7H8gPkylxMYaqmQuTIXxrNU2o4pxVwF6yzked43mLvhxA8Ymljgs1S0kNmZi2dGd3c+wUhz2fZPZhX/9qMF2ONvlIkFgplcZmsufvTezs7Oe77AWPhAssXhuCXWRabzzXd0sH9xeK+4EEhGwlygxPMZGQvpjvcBlk/UcTCb+YSiGtdCPmL//toM9n29ZvEsFUZ2Zmeu9psdTe/5Atsrcfj2pHzc5RJNa5V6xfvEDwTYP359bfMs1S3VXKB/4vm7nZ2AYLFYiYe7165sVrwoyJP/QPHR/ftfYGD//OyyBr8ZgrVHJ67MFRgsViq1YU44FsZiLaNsqzEX2oX7v3z3owL26p+fz2vkt5PPeTB3t27MFRgMocU8Wa0WQ9Nwgy0vfFSsV/71+kcE9n3r0vlZqqqduZg3OzuhgSE0Dm7iWW7eIKya0ir1ElhkiplK/tn3P/7jeb9fMv8JCAZ2r03mGu2QCgbm2mryHIKwWns1cFFmbeT7lYojmGlbzdJcIYEhq2WcrXbRlueQfOYCXMzk5S5+UKk4ghHbaoS5yCwMB8xsNdP9upZQzFXAb1KJ2p6y/9SqVJzA2uTmLsDCS3zIYGar8ThaUZtDangW1orqRU39nplLByPNxQAus7nCBENojMWZrHpyctDi8CxEjlOGk9gF15OxKsk9SzBbc4kUc4ULhvIxA/NFLf3KVhOaQ0AW6hfRcFL8v+9++umnf5vuYToY6G/Iyb9NNVfIYDIaXAUa0Gp7yrFk8gKYS538C9rFf79+/fgHi8ch7MzFMHPrcIUKZrYaJ5+cHPRhidfMpV+8/ztqPd6ncRV5wlxwRJ4fbR1t2aCFCYZKPwMWU+k0WjzAUs8qW9hwknj9+AtKwIp7dYBFTv5HW4reWKIFBbu8vIRouNVQDwRrIaeeVYLU/OAHc8CKiTY0V5WKhXRk5bOAYClZEI2w2mIX3zirJG5z5ngVYU6bzLWFySofg4FdplIUNGqXVbxQzypL1AoIsErwr4YwV+ZoC4qOFgwsZQh6jSj9paK8HSA3VRwZLmdzEZu7JJZMRsvHsMDIfISryyjbAZ3qhSNWgrE1l2jG0qrI0sBINLh30GvJ2wHOWUiYizg5mVPCZZWPIYKR+QisVugxzuGyNxctC63RQgWDQYu5GWhwc0FnFuq8BywF7c3SwJysZrMNXmRs+ydnLMJqYYOZrGYz0OBYMVtzZdxh4fkYPhhpNauBxtZcXrMQz0cVbcSED5ay6bIoh4PFBGkuX1mI5SNCe3O0DDCHLgvuHZBdPGGuy5RXri3lb2JJYA5WW+xlOZiLSyNdeUZbJhhpNbhtrFnNYTjhrtOKsp6zcalgZD5CJ9X3isUiMZwQ5tKwZPnIxyWCOQ00nL250kBe83G5YPYDDTQXzMLLbJpQ1hvassGg1cgTGgtz8dw1iaXko6f72dLByLtancJFnJyc3Z2e0si8WC0CMPuBJmk6ORG2t7ePt26oZO6tFgmYrdWgubjy8baisxQ9aG6tFhGYqcvSrUaenJxtG7pNW+SjK6tFBWYx0BDmut0GCmK16MAoVoP9EyccbxM6PqJbzUU+RglGln5w4+KrJixbqznlY7RgMGgcHq5bGpZitayvfIwYDJBxbrhQPo7oZPZoUYPhZAsw5d5lrd0r76U/crAUDaxuy+XLatGDXZrBuDMnMFT6re5qawOWMoNlnLk8d1nRg2WvSTDepnLgsrIaFS1qMDRmmcC4XXdgNqXfbLVowdTp0QTmlmvbQ5cVKZi2CFMqegBDVnOXjxGCacP+aTAwVPrpYMRdLRjYpTMOgZW+2dotBQM7vrIgA/kYEZiOdXq1u30cCOx4d/fWIhkBWjAwt7moY6XkO3EQMISFZMmFWS0KMN1cp3fq4nyDqVi7u1b1A7daQDAXZEYWbmkDl2+wXV1ndmBaPs4Dgjm5DDeX/vfuD+x4d6GULZiCxgQEcyDTszCLdU2+wHCs3eMtB7B0dh4YzC4ZCXP5BwNYu7tH9qkoiw8OZhkzk7l8g0EsqwEG1yUTApgFmo6VIoctr2AwXLcWIyfQNRMOGCUf9R8Bs9AHGMQ6s5pcrLgCP4gJg4adAZ2ZNwu9gEEs2xsYJQ9DAMPR8KOtI7Qe/2AwXHcW05gNFsNVvbwPyOLR2UuYhUomninl2R+YD3OBLERYjLf/9dTqmeBLIlzoTqkt7tg7mB9zZTl4IuX1dytZgSE0+INObxc3VY9gsMRb7ZlCEVmY9PyCI2uwWAwcsqbwxXkBg42GO3MRWZjx8R4xOzCAlroFC3QLFoK52r5esmgPFithuXh0ZkJzAiPM5aJ/ks2FY/FcxQ+WIxgetNP0aJdAcwAjzOWCijRXzPfbwxzBAFoW5KPD1gCRhS7aQlMW1v2/etYFWKyEoV2BfLTZzIE149Zd/wSykOODvMHUDRi02hbuGisw78MJEsBiYr1ALx50Bwbq4+mdIxjEstryhSLuXEFfzecWDFjNKP10MMJcvu5cgV8a5h6MsNoxFYwRbs/OMBseu+2fYIkP4R2RHsBAl6VazQzGq8rUy5LMuOUnC4OZyw8YvKvd0cAYQMjxDMddXl5fZ02P9lliVcN5D6tHMNJq1mC41D4dEcqIBFaw4cQGLOERDJT+K/2iPRgpziAkhhO//RNFjWqiZIdhHzTTMZIHtWUQyJsM9ZW5ed5rNi7QTEe1AcRVQ391f3/Pc9A0NOPPBQYL1j9ZqZH0jibf1YyABQUL01xQbN271XDZgvFMvc3bfUOssMRXv+dj3q3mCozne/l8vmBNxmWW/HsxKiX/QbMG48utvKy2xdc5Zvm/n6uRLPpFswLj6oO8KvN7IBVsLppf88QyPgqkNRjPVPK6aG+CRCU+sl9h0vJnNRoYzyTzC1HemRjCcOJFFT9Bo4BxmrlUtczcfNS//K5R9W41ExiX6edx9ciqGHDy96dO22vUTGCVPBRRFMMaTjxr4NFqEIyvtgiuJAgY117drwRt9DzlIwSrElj5Cv51nvN6chKuDqoe8hGAtcl4VfB4hTyc+FGecZ2PICKEvwZV/Kn88IcTP3I90OBgbcJeeLSWMpz4kduBBgNTet5FFjKLNFzecOJHrCur4ck2WGD16/gXljmc+JGbgQZfv1E6WmWsaCx9OPEj5y6LBpbE3zYdef/kTo2CAxrusQrNXCsv8VbqZGw3IPGqmEEh64MSX17xL+i2V6tkYzXYedTxt5NwzBqaC8pm78Bya4CPYPIProOy1V6WFdhKhhM/6vD0KkIHW9lw4kf0gYYGtsrhxI8aPUo+Us7HVjyc+NGBedvYBBYrvCXmguqQJzQE2FtlLqg+LP3wyRNmXYYTP4LbxnhLFVun4cSP2Poe5XyMezvNBZXn9giwII91rZX6Wn1UwbgwnjxZEzXKSj5yyp2rt+rVhKqOfFfj1n448SM00HBc+x0xF1Qv9u6Ya6ONNtpoo4022mijjTbaaCO3Yt9RPci9o3oQf0e1AXvbZAvW7YLP0EdzqYsJUxrYBH2Mp+p/j/WvNWez4XhifOusG5/OxvG3RCpYV5w3m1Jz2Iw3hzlp2h0Om+g/+khiJTfM5eLdXG7cyeUm0mS1y3UvLWJTaTiVRoKUGwmiJIwFYTQRZuwslxMbc4HtjCcsO8tP2PEk6oh18ezXPwEOiU/j3SaKiGqcpv41DWwoxEVRbKKPXE7qCvGcKM6Gkw5bFgUUqXk/P8mNG2wzcos1pZyEFj0ej9H645I4aSIMOQrxKfonPkUYoihI0kxC/5pLU0kazbo4WHc+l+aCKI4m3aEUrwyHojTrDnNdVurNBrlJKz8cjg86067NGpai7nw06wujuSSifBJH8/5EQggVAaXYDEGMKtJ8MhEFQeqicMyk2USazZo4WLzbH02l7niM/sh8Ls7jwmzWFURBTj9WzI+EwWjSmbDDqMHi00G8jxY8mguj/nQuVGaSIM0q0mSigE0FQURIk4qIDDSZjcTKeC6CiKHyMe2Ok9XmWBKHYk6UpuNxcyaUm8P5dVeYowgKY3R5EjlYc9ycjoeT7lgu2uPxcDyeNpHRJ2h9U/nKdNJFF+LNSXMym07is9lEW6NxH1Oc11Q+kA+VcHaH6udD9LXmMN5c77uYUgAWVeDn2Xm8zdqAvW36f0sRUD50hXcxAAAAAElFTkSuQmCC"
                    style={{
                        width: 300,
                        height: 300,
                        objectFit: 'contain',
                        margin: 'auto',
                        display: 'block',
                        marginTop: '90px'
                    }}
                />
            </div>
            <div style={{paddingTop: 30, fontSize: 25, fontWeight: 'bolder', color: 'black'}}>
                Thank you for your purchase!
            </div>
            <div style={{ paddingTop: 10, fontSize: 15}}>
              {`We have received your order #${orderId} and will begin printing it soon :)`}
            </div>
            <div style={{ paddingTop: 25, fontSize: 15}}>
                <Button
                    variant="contained"
                    startIcon={<ViewInArOutlinedIcon />}
                    style={{color: 'white'}}
                    onClick={() => repeat(0)}
                >
                    Print More Stuff
                </Button>
            </div>
        </div>
    )
}